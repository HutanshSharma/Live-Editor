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
        <dialog ref={ref} className="backdrop:bg-stone-900/80 backdrop:backdrop-blur-sm bg-[#0e1422]/95 p-6 m-auto rounded-xl shadow-2xl border-0 text-slate-200 relative w-[90vw] max-w-md">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="w-10 h-10 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-paper-plane"></i>
                </span>
                <div>
                    <h2 className="text-xl font-semibold leading-tight">Submit your code</h2>
                    <p className="text-sm text-slate-400">We'll email your work to your instructor.</p>
                </div>
            </div>
            <form ref={form} onSubmit={sendmail} className="flex flex-col gap-4 mt-5">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="sub-name" className="text-sm text-slate-400">Your name</label>
                    <input id="sub-name" name="name" type="text" placeholder="e.g. Jane Doe"
                    className="bg-[#1b2336] rounded-lg w-full px-4 py-2.5 border border-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors" required/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="sub-id" className="text-sm text-slate-400">Student ID</label>
                    <input id="sub-id" type="text" name="student_id" placeholder="e.g. 2024XXXX"
                    className="bg-[#1b2336] rounded-lg w-full px-4 py-2.5 border border-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors" required/>
                </div>
                <input type="hidden" name="code" value={generateCode(code.html,code.css,code.js)} />
                <div className="flex gap-3 mt-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-60"
                    disabled={loading}
                    type="submit">{loading ? <LoaderComp size={20} strokeWidth={3}/> : <><i className="fa-solid fa-paper-plane"></i>Submit</> }</button>
                    <button type="button"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-lg font-medium bg-white/10 hover:bg-white/20 text-slate-200 transition-colors focus:outline-none disabled:opacity-60"
                    onClick={()=>ref.current.close()}>Cancel</button>
                </div>
            </form>
        </dialog>
        ,document.getElementById("modal")
    )
}