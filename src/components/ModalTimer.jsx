import { useState, useEffect } from "react"

export default function ModalTimer({ timeout, onTimeout, type }){
    const [ remainigTime, setRemainingTime] = useState(timeout)

    useEffect(()=>{
        const id = setTimeout(onTimeout, timeout)
        return ()=>clearTimeout(id)
    }, [timeout, onTimeout])
    
    useEffect(()=>{
        const id = setInterval(()=>{
        setRemainingTime(prev=>prev-15)
        },10)

        return ()=>{clearInterval(id)}
    }, [])

    let classname = 'absolute inset-0'
    if(type==='success'){
        classname+=' progress-success'
    }
    else if(type==='failure'){
        classname+=' progress-failure'
    }

    return (
        <progress max={timeout} value={remainigTime} className={classname}/>
    )
}