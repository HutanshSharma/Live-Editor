import { useState, useEffect, useRef } from "react";

export default function Preview({code, modal}){
    const [ full,isFull ] = useState(false)
    const preview = useRef()

    useEffect(() => {
        const el = preview.current;
        if (!el) return;

        const onLoadHandler = () => {
            const iframeDoc = el.contentDocument || el.contentWindow.document;
            if (!iframeDoc) return;

            const handler = (e) => {
            e.preventDefault();
            console.log("Right click detected inside iframe");
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
    }, [code,modal]);


    function handlefull(){
        isFull(prev=>!prev)
    }

    return (
        <div className={`rounded-lg border-1 border-amber-50 bg-white p-0 overflow-clip ${full ? 'h-screen w-screen absolute top-0 left-0 z-5':'h-full w-full'}`}>
            <div className="flex justify-between preview text-slate-300 px-10">
                <h1 className='py-1 text-lg font-bold'>Preview</h1>
                {!full && <button  onClick={handlefull} className="cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300">Full Screen</button>}
                {full && <button  onClick={handlefull} className="cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300">Close</button>}
            </div>
            <div className="h-full w-full relative">
            <iframe title="Live Preview"
                    srcDoc={code}
                    ref={preview}
                    sandbox="allow-scripts allow-popups allow-same-origin"
                    className="h-full w-full">                        
            </iframe>
            </div>
        </div>
    )
}