import { useEffect } from "react";
import { createPortal } from "react-dom"
import ModalTimer from "./ModalTimer";
import { Backpack } from "lucide-react";

export default function({heading,description,ref, isopen, setisopen, bgcolor}){

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

    let className = 'backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm p-5 m-auto rounded-xl shadow-2xl border-0 relative w-[90vw] max-w-lg'
    if(bgcolor==='success'){
        className+=' bg-emerald-50 text-emerald-900'
    }
    else if(bgcolor==='failure'){
        className+=' bg-rose-50 text-rose-900'
    }

    return createPortal(
        <dialog ref={ref} className={className}>
            {isopen && <ModalTimer key={3000} timeout={3000} 
            onTimeout={()=>{ref.current.close();
                setisopen(false)
            }} type={bgcolor}/>}
            <h2 className="text-2xl border-b-1 border-slate-600">{heading}</h2>
            <p>{description}</p>
            <div className="mt-4 text-right border-0">
                <button onClick={()=>{
                    ref.current.close()
                    setisopen(false)
                }} 
                className="text-white bg-[#EF4444] px-4 hover:bg-red-600 py-2 rounded-md focus:border-0">Cancel</button>
            </div>
        </dialog>
        ,document.getElementById("modal")
    )
}