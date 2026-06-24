import { useEffect,useRef, useState } from "react";
import { createPortal } from "react-dom"
import { useImages } from "../store/ImageContext";

export default function UploadModal({modalref, successref, setisopen, failureref, maximageref}){
    const { images, setImages } = useImages()
    const name = useRef(null)
    const image = useRef(null)
    const [selectedFileName, setSelectedFileName] = useState('')

    const handleUpload = (e) => {
        e.preventDefault()
        const file = image.current.files[0]
        const imagename = name.current.value
        if(imagename in images){
            setisopen(true)
            failureref.current.showModal()
            modalref.current.showModal()
        }
        else if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                try{
                    sessionStorage.setItem('images', JSON.stringify({...images,[imagename]:reader.result}));
                    setImages((prev) => ({ ...prev, [imagename]: reader.result }));
                    name.current.value=null
                    image.current.value=null
                    setSelectedFileName('')
                    setisopen(true)
                    successref.current.showModal()
                }
                catch{
                    name.current.value=null
                    image.current.value=null
                    setSelectedFileName('')
                    setisopen(true)
                    maximageref.current.showModal()
                }
            };
            reader.readAsDataURL(file);
            }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName(''); 
        }
    };

    useEffect(() => {
        const dialog = modalref.current;
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
    }, [modalref]);

    return createPortal(
        <dialog ref={modalref} className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 px-6 sm:px-10 py-5 m-auto rounded-xl shadow-2xl border-0 text-slate-200 w-[90vw] max-w-md">
            <h2 className="text-2xl text-[#E0E0E0] font-semibold border-b border-slate-600 pb-2 mb-4">Add images here</h2>
            <h4 className="text-sm text-red-400/80 mb-5">You have some fixed storage to upload images</h4>
            <form className="flex flex-col gap-4" onSubmit={handleUpload}>
                <input type="text" placeholder="Enter the name of the image..."
                className="bg-[#1b2336] rounded-lg w-full px-4 py-2 border border-white/10 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors" ref={name} required></input>
                <input type="file"
                    id="file-upload"
                    accept="image/*"
                    className='sr-only' 
                    ref={image}
                    onChange={handleFileChange} required/>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <div className="custom-text">
                    {selectedFileName||'Choose the image file'}
                    </div>
                </label>
                <div className="flex gap-3 mb-3">
                    <button className="text-white bg-indigo-500 px-5 hover:bg-indigo-600 py-2 rounded-lg font-medium transition-colors focus:outline-none"
                    type="submit">Upload</button>
                    <button className="text-slate-200 bg-white/10 px-5 hover:bg-white/20 py-2 rounded-lg font-medium transition-colors focus:outline-none"
                    onClick={()=>modalref.current.close()} type="button">Cancel</button>
                </div>
            </form>
        </dialog>
        ,document.getElementById("modal")
    )
}