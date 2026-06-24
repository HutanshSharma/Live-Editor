import { useEffect } from "react";
import { createPortal } from "react-dom"

export default function Modal({heading,description,ref,btntext,func}){
    useEffect(() => {
        const dialog = ref.current;
        const handler = (e)=>{
            e.preventDefault()
        }
        const enterhandler= (e)=>{
            if(e.key === 'Enter' || e.key === 'Escape'){
                e.preventDefault()
            }
        }
        if(dialog){
            dialog.addEventListener("cancel",handler);
            dialog.addEventListener("keydown",enterhandler);
        }
        return () => {
            if (dialog) {
                dialog.removeEventListener("cancel",handler);
                dialog.removeEventListener("keydown",enterhandler);
            }
        };
    }, [ref]);

    return createPortal(
        <dialog ref={ref} className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 p-5 m-auto rounded-xl shadow-2xl border-0 text-slate-200 w-[90vw] max-w-md">
            <h2 className="text-2xl font-semibold border-b border-slate-600 pb-2 mb-3">{heading}</h2>
            <p className="text-slate-300">{description}</p>
            <div className="mt-4 text-right border-0">
                <button onClick={()=>{ref.current.close()
                    if(func){
                        func()
                    }
                }} className="text-white bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg font-medium transition-colors focus:outline-none">{btntext}</button>
            </div>
        </dialog>
        ,document.getElementById("modal")
    )
}