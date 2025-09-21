import ImagesModal from "./ImagesModal";
import { useRef } from "react";

export default function Header(){
    const modal = useRef()
    return (
        <>
        <ImagesModal ref={modal} />
        <header className="flex justify-between border-b-1 border-gray-400 text-white px-20 h-14 items-center ">
            <h1 className="bitcount-prop-single text-white text-4xl font-bold ">
                <i className="fa-solid fa-not-equal text-2xl mr-6"></i>NoCheating</h1>
            <div className="flex gap-10">
                <button className="text-xl cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300"
                    onClick={()=>modal.current.showModal()}>
                    <i className="fa-solid fa-images mr-2"></i>
                    Uploaded Pictures</button>
                <a href="https://developer.mozilla.org/en-US/" target="_blank" rel="noopener noreferrer"
                className="text-xl cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300">
                    <i className="fa-solid fa-file mr-2"></i>MDN Docs</a>
            </div>
        </header>
        </>
    )
}