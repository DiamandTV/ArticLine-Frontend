import { useQuery } from "@tanstack/react-query";
import { useNotificationService } from "../../services/notificationsService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../store/notificationsSlice";

export function NotificationQuery({children}:{children:React.ReactNode}){
    const dispatch = useDispatch()
    const {isSuccess,refetch} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['get-notifications'],
        queryFn:async()=>await useNotificationService.getNotifications(),
        onSuccess:(data)=>{
            console.log(data.data)
            if(data && data.data){
                dispatch(setNotifications(data.data))
                
            }
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    useEffect(()=>{
        refetch()
    },[])
    
    return (
      isSuccess ? children : null
    )
}