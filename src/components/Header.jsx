import ImagesModal from "./ImagesModal";
import { useRef, useState } from "react";
import SubmitModal from "./SubmitModal";
import SuccessModal from "./SuccessModal";

export default function Header({code}){
    const [isopen, setisopen] = useState(false)
    const modal = useRef()
    const submitmodal = useRef()
    const successmodal = useRef()

    const btn_class = "text-xl cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300"

    return (
        <>
        <ImagesModal ref={modal} />
        <SubmitModal ref={submitmodal} successref={successmodal} code={code} setisopen={setisopen}/>
        <SuccessModal ref={successmodal} heading={'Code submitted'} description={'Your code has been submitted successfully'} isopen={isopen} setisopen={setisopen} bgcolor={'success'}/>
        <header className="flex justify-between border-b-1 border-gray-400 text-white px-20 h-14 items-center ">
            <h1 className="bitcount-prop-single text-white text-4xl font-bold ">
                <i className="fa-solid fa-not-equal text-2xl mr-6"></i>NoCheating</h1>
            <div className="flex gap-10">
                <button className={btn_class}
                    onClick={()=>modal.current.showModal()}>
                    <i className="fa-solid fa-images mr-2"></i>
                    Uploaded Images</button>
                <button className={btn_class} onClick={()=>submitmodal.current.showModal()}>
                    <i className="fa-solid fa-file-export mr-2"></i>Submit</button>
                <a href="https://developer.mozilla.org/en-US/" target="_blank" rel="noopener noreferrer"
                className={btn_class}>
                    <i className="fa-solid fa-file mr-2"></i>MDN Docs</a>
            </div>
        </header>
        </>
    )
}