import ImagesModal from "./ImagesModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import SubmitModal from "./SubmitModal";
import SuccessModal from "./SuccessModal";

export default function Header({code,submitmodal,modal,successmodal}){
    const [isopen, setisopen] = useState(false)

    const btn_class = "chrome-btn text-base sm:text-lg text-slate-200 hover:text-white"

    return (
        <>
        <ImagesModal ref={modal} />
        <SubmitModal ref={submitmodal} successref={successmodal} code={code} setisopen={setisopen}/>
        <SuccessModal ref={successmodal} heading={'Code submitted'} description={'Your code has been submitted successfully'} isopen={isopen} setisopen={setisopen} bgcolor={'success'}/>
        <header className="flex justify-between border-b border-white/10 text-white px-4 sm:px-8 lg:px-20 h-14 items-center shrink-0">
            <Link to="/" title="Back to Home" className="bitcount-prop-single text-white text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center rounded-lg px-2 -mx-2 transition-colors hover:bg-white/15">
                <i className="fa-solid fa-not-equal text-xl sm:text-2xl mr-2 sm:mr-5"></i>NoCheating</Link>
            <div className="flex gap-2 sm:gap-5 lg:gap-7 items-center">
                <button className={btn_class}
                    onClick={()=>modal.current.showModal()}>
                    <i className="fa-solid fa-images sm:mr-2"></i>
                    <span className="hidden sm:inline">Uploaded Images</span></button>
                <button className={btn_class} onClick={()=>submitmodal.current.showModal()}>
                    <i className="fa-solid fa-file-export sm:mr-2"></i><span className="hidden sm:inline">Submit</span></button>
                <a href="https://developer.mozilla.org/en-US/" target="_blank" rel="noopener noreferrer"
                className={btn_class}>
                    <i className="fa-solid fa-book-open sm:mr-2"></i><span className="hidden sm:inline">Documentation</span></a>
            </div>
        </header>
        </>
    )
}