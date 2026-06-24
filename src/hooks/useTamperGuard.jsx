import { useEffect } from 'react';

const intentionallyClosed =
  typeof WeakSet !== 'undefined' ? new WeakSet() : null;

if (
  typeof HTMLDialogElement !== 'undefined' &&
  !HTMLDialogElement.prototype.__tamperGuardPatched
) {
  const originalClose = HTMLDialogElement.prototype.close;
  HTMLDialogElement.prototype.close = function (...args) {
    if (intentionallyClosed) intentionallyClosed.add(this);
    return originalClose.apply(this, args);
  };
  HTMLDialogElement.prototype.__tamperGuardPatched = true;
}

export function useTamperGuard() {
  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot || typeof MutationObserver === 'undefined') return;
    const mountPath = window.location.pathname;

    let tripped = false;
    const reload = () => {
      if (tripped) return;
      tripped = true;
      window.location.reload();
    };

    const modalObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          for (const node of m.removedNodes) {
            if (node.nodeType !== 1) continue;
            const containsDialog =
              node.tagName === 'DIALOG' ||
              (node.querySelector && node.querySelector('dialog'));
            if (containsDialog && window.location.pathname === mountPath) {
              reload();
              return;
            }
          }
        }

        if (m.type === 'attributes' && m.attributeName === 'open') {
          const dialog = m.target;
          const wasOpen = m.oldValue !== null; 
          const nowOpen = dialog.hasAttribute('open');
          if (wasOpen && !nowOpen) {
            if (intentionallyClosed && intentionallyClosed.has(dialog)) {
              intentionallyClosed.delete(dialog);
            } else {
              reload();
              return;
            }
          }
        }
      }
    });
    modalObserver.observe(modalRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['open'],
    });

    const hostObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.removedNodes) {
          if (node === modalRoot || (node.contains && node.contains(modalRoot))) {
            reload();
            return;
          }
        }
      }
    });
    hostObserver.observe(document.body, { childList: true });

    return () => {
      modalObserver.disconnect();
      hostObserver.disconnect();
    };
  }, []);
}
