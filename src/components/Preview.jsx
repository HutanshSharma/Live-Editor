import { useState, useEffect, useRef } from "react";
import LoaderComp from "./LoaderComp";

const DURATION = 460;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const TRANSITION = `transform ${DURATION}ms ${EASE}, border-radius ${DURATION}ms ease`;

export default function Preview({ code, modal }) {
    const [full, setFull] = useState(false)
    const [animating, setAnimating] = useState(false)
    const preview = useRef()
    const wrapperRef = useRef(null)   
    const panelRef = useRef(null)   

    useEffect(() => {
        const el = preview.current;
        if (!el) return;

        const onLoadHandler = () => {
            const iframeDoc = el.contentDocument || el.contentWindow.document;
            if (!iframeDoc) return;

            const handler = (e) => {
                e.preventDefault();
                modal.current.showModal();
            };

            iframeDoc.addEventListener("contextmenu", handler);

            return () => {
                iframeDoc.removeEventListener("contextmenu", handler);
            };
        };

        el.addEventListener("load", onLoadHandler);
        return () => {
            el.removeEventListener("load", onLoadHandler);
        };
    }, [code, modal]);

    useEffect(() => {
        if (!full) return;
        const onResize = () => {
            const el = panelRef.current;
            if (!el) return;
            el.style.width = window.innerWidth + 'px';
            el.style.height = window.innerHeight + 'px';
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [full]);

    function setFixedFullscreen(el) {
        el.style.transition = 'none';
        el.style.position = 'fixed';
        el.style.margin = '0';
        el.style.zIndex = '50';
        el.style.top = '0px';
        el.style.left = '0px';
        el.style.width = window.innerWidth + 'px';
        el.style.height = window.innerHeight + 'px';
        el.style.transformOrigin = 'top left';
        el.style.willChange = 'transform';
    }

    function shrinkTransform(rect) {
        const sx = rect.width / window.innerWidth;
        const sy = rect.height / window.innerHeight;
        return `translate(${rect.left}px, ${rect.top}px) scale(${sx}, ${sy})`;
    }

    function whenSettled(el, onEnd) {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', handler);
            onEnd();
        };
        const handler = (e) => {
            if (e.target === el && e.propertyName === 'transform') finish();
        };
        el.addEventListener('transitionend', handler);
        setTimeout(finish, DURATION + 120);
    }

    function openFull() {
        const el = panelRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();

        setAnimating(true); 
        setFixedFullscreen(el);
        el.style.borderRadius = '0.6rem';
        el.style.transform = shrinkTransform(rect); 

        el.getBoundingClientRect(); 

        el.style.transition = TRANSITION;
        el.style.transform = 'translate(0px, 0px) scale(1, 1)';
        el.style.borderRadius = '0px';

        setFull(true);
        whenSettled(el, () => {
            el.style.willChange = '';
            setAnimating(false); 
        });
    }

    function closeFull() {
        const el = panelRef.current;
        const wrap = wrapperRef.current;
        if (!el || !wrap) return;

        const rect = wrap.getBoundingClientRect();

        setAnimating(true);
        el.style.transition = TRANSITION;
        el.style.transform = shrinkTransform(rect);
        el.style.borderRadius = '0.6rem';

        setFull(false);
        whenSettled(el, () => {
            el.style.cssText = ''; 
            setAnimating(false);
        });
    }

    function handlefull() {
        full ? closeFull() : openFull();
    }

    return (
        <div ref={wrapperRef} className="h-full w-full">
            <div
                ref={panelRef}
                className="relative flex flex-col overflow-hidden bg-white shadow-lg h-full w-full rounded-lg">
                <div
                    aria-hidden="true"
                    className={`preview-cover absolute inset-0 z-10 flex items-center justify-center ${animating ? 'opacity-100' : 'opacity-0 pointer-events-none transition-opacity duration-300'}`}>
                    <LoaderComp size={46} strokeWidth={4} />
                </div>
                <div className="flex justify-between items-center preview text-slate-100 px-4 sm:px-6 shrink-0">
                    <h1 className='py-1.5 text-base sm:text-lg font-bold'>Preview</h1>
                    <button onClick={handlefull} className="chrome-btn text-sm flex items-center gap-2">
                        {full
                            ? <><i className="fa-solid fa-compress"></i>Close</>
                            : <><i className="fa-solid fa-expand"></i>Full Screen</>}
                    </button>
                </div>
                <div className="flex-1 min-h-0 w-full relative">
                    <iframe title="Live Preview"
                        srcDoc={code}
                        ref={preview}
                        sandbox="allow-scripts allow-popups allow-same-origin"
                        className="h-full w-full border-0">
                    </iframe>
                </div>
            </div>
        </div>
    )
}
