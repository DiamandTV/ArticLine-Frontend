// import { useEffect } from 'react';
// import { useSSE } from 'react-hooks-sse';
// export function NotifierView({children}:{children:React.ReactNode}){
//     const state = useSSE("NEW ORDER",{
        
//     })
//     useEffect(()=>{
//         alert("ARR")
//         console.log(state)
//     },[state])
//     return children
// }

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";

export function NotifierView({children}:{children:React.ReactNode}){
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    const [eventSource,eventSourceStatus] = useEventSource(`http://127.0.0.1:8000/events/listener/notifier_${auth?.id}`,true)

    useEventSourceListener(
        eventSource,
        ['NEW ORDER'],
        (evt)=>{
            alert(evt)
        },
    )    

    return children
}