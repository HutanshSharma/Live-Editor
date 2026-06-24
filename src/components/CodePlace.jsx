import Editor from '@monaco-editor/react';
import { useRef } from 'react';

export default function CodePlace({ lang, defaultvalue, ref, onWrite, onExpand, active, modal }) {
    const editorRef = useRef()

    const name = lang.toLowerCase()
    const isActive = active === name
    const isCollapsed = active !== '' && active !== name

    let classes = `editor-pane ${name}`
    if (isActive) classes += ' is-active'
    if (isCollapsed) classes += ' is-collapsed'

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

    return (
        <div className={classes}>
            <div className='editor-head'>
                <h3 className='font-bold flex items-center'>{ele}{lang}</h3>
                <button
                    onClick={() => onExpand(isActive ? '' : name)}
                    className="chrome-btn text-sm">
                    {isActive ? 'Minimize' : 'Expand'}
                </button>
            </div>
            <div className='editor-body'>
                <Editor
                    height='100%'
                    defaultLanguage={name}
                    defaultValue={defaultvalue}
                    onMount={handleEditorMount}
                    theme="vs-dark"
                    onChange={onWrite}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 8 },
                    }}
                />
            </div>
        </div>
    )
}
