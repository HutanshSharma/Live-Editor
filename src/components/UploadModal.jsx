import { useEffect,useRef, useState } from "react";
import { createPortal } from "react-dom"
import { useImages } from "../store/ImageContext";

export default function({modalref}){
    const { images, setImages } = useImages()
    const name = useRef(null)
    const image = useRef(null)
    const [selectedFileName, setSelectedFileName] = useState('')

    const handleUpload = (e) => {
        e.preventDefault()
        const file = image.current.files[0]
        const imagename = name.current.value
        if(imagename in images){
            alert('Image name already used')
            modalref.current.showModal()
        }
        else if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prev) => ({ ...prev, [imagename]: reader.result }));
                modalref.current.close()
                name.current.value=null
                image.current.value=null
                setSelectedFileName('')
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
        <dialog ref={modalref} className="backdrop:bg-stone-900/90 bg-[rgba(11,11,11,0.8)] px-12 py-4 m-auto rounded-md shadow-md border-0 text-gray-300">
            <h2 className="text-2xl text-[#E0E0E0] border-b-1 border-slate-600 mb-10">Add images here</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpload}>
                <input type="text" placeholder="Enter the name of the image..." 
                className="bg-[#2C2C2C] rounded-sm min-w-md px-4 py-2 border-b-3 border-transparent focus:outline-none focus:ring-0 focus:border-b-gray-500" ref={name}></input>
                <input type="file"
                    id="file-upload"
                    accept="image/*"
                    className='sr-only' 
                    ref={image}
                    onChange={handleFileChange}/>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <div className="custom-text">
                    {selectedFileName||'Choose the image file'}
                    </div>
                </label>
                <div className="flex gap-2 mb-3">
                    <button className="text-white bg-[#2196F3] px-4 hover:bg-[#1976D2] py-2 rounded-md focus:border-0"
                    type="submit">Upload</button>
                    <button className="text-white bg-red-400 px-4 hover:bg-red-600 py-2 rounded-md focus:border-0"
                    onClick={()=>modalref.current.close()}>Cancel</button>
                </div>
            </form>
        </dialog>
        ,document.getElementById("modal")
    )
}