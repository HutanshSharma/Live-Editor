import { useEffect } from "react";
import { createPortal } from "react-dom"
import { useImages } from "../store/ImageContext";
import IndividualImage from "./IndividualImage";

export default function({ref}){
    const { images } = useImages()
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
        <dialog ref={ref} className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 py-5 px-5 sm:px-10 m-auto rounded-xl w-[92vw] max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl border-0 text-slate-200">
            <h2 className="text-2xl font-semibold border-b border-slate-600 pb-2">Images</h2>
            {Object.keys(images).length === 0
                ? <p className="text-slate-400 mt-8 mb-4 text-center">No images uploaded yet.</p>
                : <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 mt-8">
                    {Object.entries(images).map(([key,val])=>{
                        return (<IndividualImage key={key} img={val} name={key}/>)
                    })}
                </div>}
            <div className="mt-6 text-right border-0">
                <button onClick={()=>{ref.current.close()}}
                className="text-slate-200 bg-white/10 px-5 hover:bg-white/20 py-2 rounded-lg font-medium transition-colors focus:outline-none">Close</button>
            </div>
        </dialog>
        ,document.getElementById("modal")
    )
}