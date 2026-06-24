import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { createPortal } from "react-dom";
import LoaderComp from "./LoaderComp";
import { generateCode } from "../generateCode";

export default function({ref,code, successref, setisopen}){
    const form = useRef()
    const [loading, setloading] = useState(false)

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

    function sendmail(e){
        e.preventDefault()
        setloading(true)
        emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,                            
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
            )
        .then(
            ()=>{
                setisopen(true)
                successref.current.showModal()
                ref.current.close()
                setloading(false)
            }
        )
    }

    return createPortal(
        <dialog ref={ref} className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 p-5 m-auto rounded-xl shadow-2xl border-0 text-slate-200 relative w-[90vw] max-w-md">
            <h2 className="text-2xl font-semibold border-b border-slate-600 pb-2">Submit the code</h2>
            <form ref={form} onSubmit={sendmail} className="flex flex-col gap-3 mt-4">
                <label htmlFor="name">Enter your name here</label>
                <input name="name" type="text"
                className="bg-[#1b2336] rounded-lg w-full px-4 py-2 border border-white/10 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors" required/>
                <label htmlFor="student-id">Enter your Student'id here</label>
                <input type="text" name="student_id"
                className="bg-[#1b2336] rounded-lg w-full px-4 py-2 border border-white/10 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors" required/>
                <input type="hidden" name="code" value={generateCode(code.html,code.css,code.js)} />
                <div className="flex gap-2 mb-3">
                    <button className="text-white bg-[#2196F3] px-4 hover:bg-[#1976D2] py-2 rounded-md focus:border-0 min-w-22"
                    type="submit">{loading ? <LoaderComp size={20} strokeWidth={3}/>:'Submit' }</button>
                    <button type="button" 
                    disabled={loading}
                    className={!loading ? "text-white bg-red-400 px-4 hover:bg-red-600 py-2 rounded-md focus:border-0":'text-white bg-gray-600 hover:bg-gray-700 py-2 rounded-md px-4'}
                    onClick={()=>ref.current.close()}>Cancel</button>
                </div>
            </form>
        </dialog>
        ,document.getElementById("modal")
    )
}