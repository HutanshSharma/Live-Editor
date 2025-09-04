import { useEffect } from "react";
import { createPortal } from "react-dom"

export default function({heading,description,ref,btntext,func}){
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
        <dialog ref={ref} className="backdrop:bg-stone-900/90 bg-[rgba(11,11,11,0.8)] p-4 fixed top-[40vh] left-[40vw] rounded-md shadow-md border-0 text-gray-300">
            <h2 className="text-2xl border-b-1 border-slate-600">{heading}</h2>
            <p>{description}</p>
            <div className="mt-4 text-right border-0">
                <button onClick={()=>{ref.current.close()
                    if(func){
                        func()
                    }
                }} className="text-white bg-red-400 px-4 hover:bg-red-600 py-2 rounded-md focus:border-0">{btntext}</button>
            </div>
        </dialog>
        ,document.getElementById("modal")
    )
}