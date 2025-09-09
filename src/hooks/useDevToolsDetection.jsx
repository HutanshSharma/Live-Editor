import { useState, useEffect } from 'react';

export function useDevToolsDetection() {
  const [areDevToolsOpen, setAreDevToolsOpen] = useState(false);

  useEffect(()=>{
    const threshold=160;

    const checkDevTools = () => {
      const widthThreshold = (window.outerWidth - window.innerWidth) > threshold;
      const heightThreshold = (window.outerHeight - window.innerHeight) > threshold; 
      if (widthThreshold || heightThreshold) {
        setAreDevToolsOpen(true);
        return;
      }
    };
    const interval = setInterval(checkDevTools, 500);
    return () => clearInterval(interval);
  }, []);

  return areDevToolsOpen;
}