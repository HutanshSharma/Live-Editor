import Editor from '@monaco-editor/react';
import { useRef } from 'react';

export default function CodePlace({lang, defaultvalue, ref, onWrite, onExpand, active, modal}) {
    const editorRef = useRef()
    
    const name = lang.toLowerCase()
    let classes = `w-full rounded-md overflow-hidden border-1 ${name} border-amber-50 expand-in`

    if(active !== '' && active !== name)
        classes += ' activefade'
    if(active === name)
        classes += ' active'

    let ele = ''
    name === 'html' ? ele = <i className="fa-brands fa-html5 mr-2"></i> :
        name === 'css' ? ele = <i className="fa-brands fa-css3-alt mr-2"></i> :
            ele = <i className="fa-brands fa-square-js mr-2"></i>

    const handleEditorMount = (editor) => {
        ref.current = editor
        editorRef.current = editor
        editor.onContextMenu((e) => {
            e.event.preventDefault()
            modal.current.showModal()
        })
    }

    return(
        <div className={classes}>
            <div className='flex justify-between px-10 py-1'>
                <h3 className='font-bold'>{ele}{lang}</h3>
                {!active && <button onClick={() => onExpand(name)} className="cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300">Expand</button>}
                {active && <button onClick={() => onExpand("")} className="cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300">Minimize</button>}
            </div>
            <Editor
                height='100%'
                defaultLanguage={name}
                defaultValue={defaultvalue}
                onMount={handleEditorMount}
                theme="vs-dark"
                onChange={onWrite}
            />
        </div>
    )
}