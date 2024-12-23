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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toast } from "react-toastify";
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";
import { NotificationEventModel, NotificationModel } from '../models/notification';
import { addOrder, OrderType, } from '../store/orderSlice';
import { NotifyCard } from '../components/cards/NotifyCard';
import { useEffect } from 'react';

export function NotifierView({children}:{children:React.ReactNode}){
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    const dispatch = useDispatch()
    const [eventSource/*,eventSourceStatus*/] = useEventSource(`http://127.0.0.1:8000/events/listener/notifier_${auth?.id}`,true)

    // useEffect(()=>{
    //     const notification:NotificationModel = {
    //         id:2,
    //         image:"",
    //         event_type:"NEW ORDER",
    //         title:"NEW ORDER",
    //         message:"REHMAN has made a new order",
    //         created_at:"24/11/2004",
    //         readen:false,
    //         readen_at:"24/11/2004"
    //     }
    //     toast(<NotifyCard notification={notification}/>)
    // })

    useEventSourceListener(
        eventSource,
        ['NEW ORDER'],
        (evt)=>{
            const notification:NotificationEventModel = JSON.parse(evt.data)
            alert("OK")
            dispatch(addOrder({
                order:notification.sender,
                type:OrderType.COMPANY_ACTIVE
            }))
            toast(<NotifyCard notification={notification.notification}/>)
        },
    )    

    return children
}