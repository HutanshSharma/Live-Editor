import CodePlace from "./codeplace"
import { useState } from "react"

export default function EditorsGroup({handleCodeChange,htmlRef,cssRef,jsRef,currentdata,modal}){
    const [ activeEditor, setActiveEditor ] = useState('')

    function handleEditorChange(value){
        setActiveEditor(value)
    }

    return(
        <>
            <CodePlace lang={'HTML'} ref={htmlRef} defaultvalue={currentdata.html} onWrite={handleCodeChange} onExpand={handleEditorChange} active={activeEditor} modal={modal}></CodePlace>
            <CodePlace lang={'CSS'} ref={cssRef} defaultvalue={currentdata.css} onWrite={handleCodeChange} onExpand={handleEditorChange} active={activeEditor} modal={modal}></CodePlace>
            <CodePlace lang={'JavaScript'} ref={jsRef} defaultvalue={currentdata.js} onWrite={handleCodeChange} onExpand={handleEditorChange} active={activeEditor} modal={modal}></CodePlace>
        </>
    )
}