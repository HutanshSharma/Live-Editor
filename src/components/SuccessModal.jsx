import { useEffect } from "react";
import { createPortal } from "react-dom"
import ModalTimer from "./ModalTimer";
import { CheckCircle2, XCircle, X } from "lucide-react";

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

    const isSuccess = bgcolor === 'success'

    function close(){
        if (ref.current) ref.current.close()
        setisopen(false)
    }

    return createPortal(
        <dialog
            ref={ref}
            className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 text-slate-100 p-0 m-auto rounded-xl shadow-2xl border-0 relative w-[90vw] max-w-sm overflow-hidden">
            <div className="flex items-start gap-4 p-5 pb-7">
                <div className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                    {isSuccess ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold">{heading}</h2>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{description}</p>
                </div>
                <button
                    onClick={close}
                    aria-label="Close"
                    className="shrink-0 -mt-1 -mr-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                </button>
            </div>
            {isopen && <ModalTimer key={3000} timeout={3000} onTimeout={close} type={bgcolor} />}
        </dialog>
        ,document.getElementById("modal")
    )
}
