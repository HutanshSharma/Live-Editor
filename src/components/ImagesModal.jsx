import { useEffect } from "react";
import { createPortal } from "react-dom"
import { useImages } from "../store/ImageContext";

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
        <dialog ref={ref} className="backdrop:bg-stone-900/90 bg-[rgba(11,11,11,0.8)] py-4 px-12 m-auto rounded-md min-w-xl shadow-md border-0 text-gray-300">
            <h2 className="text-2xl border-b-1 border-slate-600">Images</h2>
            <div className="flex flex-wrap gap-16 mt-10">
                {Object.entries(images).map(([key,val])=>{
                    return (
                        <div className="flex flex-col justify-center items-center" key={key}>
                            <img className="h-36 w-40 rounded-md" src={val}/>
                            <p className="text-xl">{key}</p>
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 text-right border-0">
                <button onClick={()=>{ref.current.close()}} 
                className="text-white bg-red-400 px-4 hover:bg-red-600 py-2 rounded-md focus:border-0">Close</button>
            </div>
        </dialog>
        ,document.getElementById("modal")
    )
}