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
import { NotificationEventModel } from '../models/notification';
import { addOrder, OrderType, updateOrder, } from '../store/orderSlice';
import { NotifyCard } from '../components/cards/NotifyCard';
import { addNotification } from '../store/notificationsSlice';
import { HOST_URL } from '../constraints';

export function NotifierView({children}:{children:React.ReactNode}){
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    const dispatch = useDispatch()
    const [eventSource/*,eventSourceStatus*/] = useEventSource(`${HOST_URL}/events/listener/notifier_${auth?.id}`,true)

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
            dispatch(addOrder({
                order:notification.sender,
                type:OrderType.COMPANY_ACTIVE
            }))
            dispatch(addNotification(notification.notification))
            toast(<NotifyCard notification={notification.notification}/>)
        },
    )    

    useEventSourceListener(
        eventSource,
        ['ORDER ACCEPTED','ORDER WORKING ON','ORDER SENDED','ORDER CANCELED'],
        (evt)=>{
            const notification:NotificationEventModel = JSON.parse(evt.data)
            dispatch(updateOrder({
                order:notification.sender,
                type:OrderType.NORMAL
            }))
            dispatch(addNotification(notification.notification))
            toast(<NotifyCard notification={notification.notification}/>)
        },
    )    

    return children
}