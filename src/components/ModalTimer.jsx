import { useState, useEffect } from "react"

export default function ModalTimer({ timeout, onTimeout, type }){
    const [ remainingTime, setRemainingTime ] = useState(timeout)

    useEffect(()=>{
        const id = setTimeout(onTimeout, timeout)
        return ()=>clearTimeout(id)
    }, [timeout, onTimeout])

    useEffect(()=>{
        const id = setInterval(()=>{
            setRemainingTime(prev => Math.max(0, prev - 30))
        }, 30)
        return ()=>clearInterval(id)
    }, [])

    const pct = (remainingTime / timeout) * 100
    const color = type === 'failure' ? '#f43f5e' : '#10b981'

    return (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
            <div
                className="h-full"
                style={{ width: `${pct}%`, backgroundColor: color, transition: 'width 30ms linear' }}
            />
        </div>
    )
}
