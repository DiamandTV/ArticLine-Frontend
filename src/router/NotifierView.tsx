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
import { ORDER_COMPANY_ORDER_NOTIFICATION_EVENT_TYPE, ORDER_DELIVERY_BATCH_COMPANY_PARAMS_EVENT_TYPE, ORDER_DELIVERY_BATCH_COMPANY_STATUS_EVENT_TYPE, ORDER_USER_NOTIFICATION_EVENT_TYPE, ORDER_USER_PARAMS_NOTIFICATION_EVENT_TYPE, ORDER_USER_PIN_CODE_NOTIFICATION_EVENT_TYPE } from '../models/eventType';

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

    // ? COMPANY ORDER
    useEventSourceListener(
        eventSource,
        ORDER_COMPANY_ORDER_NOTIFICATION_EVENT_TYPE,
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

    // ? USER ORDER
    useEventSourceListener(
        eventSource,
        [...ORDER_USER_NOTIFICATION_EVENT_TYPE,...ORDER_USER_PIN_CODE_NOTIFICATION_EVENT_TYPE],
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

    // ? USER ORDER PARAMS
    useEventSourceListener(
        eventSource,
        ORDER_USER_PARAMS_NOTIFICATION_EVENT_TYPE,
        (evt)=>{
            const notification:NotificationEventModel = JSON.parse(evt.data)
            dispatch(addNotification(notification.notification))
            toast(<NotifyCard notification={notification.notification}/>)
        }
    )

    // ? COMPANY ORDER BATCH PARAMS
    useEventSourceListener(
        eventSource,
        ORDER_DELIVERY_BATCH_COMPANY_PARAMS_EVENT_TYPE,
        (evt)=>{
            const notification:NotificationEventModel = JSON.parse(evt.data)
            dispatch(addNotification(notification.notification))
            toast(<NotifyCard notification={notification.notification}/>)
        }
    )

    // ? COMPANY ORDER BATCH STATUS
    useEventSourceListener(
        eventSource,
        ORDER_DELIVERY_BATCH_COMPANY_STATUS_EVENT_TYPE,
        (evt)=>{
            const notification:NotificationEventModel = JSON.parse(evt.data)
            dispatch(addOrder({
                order:notification.sender,
                type:OrderType.COMPANY_ACTIVE_BATCH
            }))
            dispatch(addNotification(notification.notification))
            toast(<NotifyCard notification={notification.notification}/>)
        }
    )
    
    return children
}