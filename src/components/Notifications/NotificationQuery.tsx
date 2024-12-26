import { useQuery } from "@tanstack/react-query";
import { useNotificationService } from "../../services/notificationsService";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../store/notificationsSlice";
import { PaginationModel } from "../../models/pagination";
import { PaginationContext } from "../Pagination/PaginationContext";

export function NotificationQuery({children}:{children:React.ReactNode}){
    const dispatch = useDispatch()
    const {setPageData,page} = useContext(PaginationContext)
    const {isSuccess,refetch} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['get-notifications',page],
        queryFn:async()=>await useNotificationService.getNotifications(),
        onSuccess:(data)=>{
            console.log(data.data)
            if(data && data.data){
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setNotifications(data.data.results))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
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