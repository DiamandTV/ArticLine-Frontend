import { NotifyCard } from "../cards/NotifyCard"
import { DeleteButton } from "../Buttons/DeleteButton"
import dayjs from "dayjs"
import { useNotificationService } from "../../services/notificationsService"
import { NotificationModel } from "../../models/notification"
import { useContext, useEffect, useRef } from "react"
import { PopupContext } from "../Popup/PopupContext"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PaginationModel } from "../../models/pagination"
import { AxiosResponse } from "axios"

export function NotificationList(){
    const {setOpen} = useContext(PopupContext)
    const lastNotification = useRef<HTMLDivElement | null>(null)
    const  {data ,status,fetchNextPage,refetch} = useInfiniteQuery({
        queryKey:['get-notifications'],
        queryFn:({pageParam=1})=>useNotificationService.getNotifications({pageParam}),
        initialPageParam:1,
        pagaParams:1,
        getNextPageParam:(lastPage:AxiosResponse)=>{
            const data = lastPage.data as PaginationModel
            console.log("DATA")
            console.log(data)
            if (!data) return 1
            if(data.next) return data.current_page_number + 1
            return undefined
            
        }
    })
    
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        if(entry.target == lastNotification.current){
                            fetchNextPage()
                        }
                    }
                })
            },
            {
                //root:containerRef.current,
                rootMargin:'0px',
                threshold:0.001
            }
        )

        if(lastNotification.current) {
            observer.observe(lastNotification.current)
        }

        return ()=>{
            if(observer){
                observer.disconnect()
            }
        }
    
    },[])

    return(
        data && status === 'success' ? 
        <div className="w-full max-w-96 h-full max-h-96 flex flex-col gap-y-2 p-2 scrollbar-hide">
            {/*
                <div className="bg-white sticky top-0">
                    <HighlightedTitle title={"Notifications"} className="text-lg text-center"/>
                </div>
            */}
            {data.pages.map((page)=>{
                if (page.data.results.length ===0) setOpen(false)
                return (page.data as PaginationModel).results.map((notification)=>{
                    return <NotificationListItem notification={notification as NotificationModel} refetch={refetch}/>
                })
            })}

            <div ref={lastNotification} className="py-1"></div>
        </div> : null
    )
}


function NotificationListItem({notification,refetch}:{notification:NotificationModel,refetch:()=>void}){
    
    return(
        <div className="w-full bg-white p-2 rounded-xl flex flex-col gap-y-1" >
            <div className="w-full flex flex-row items-center gap-x-2">
                <NotifyCard notification={notification} />
            
                <DeleteButton
                    className="text-lg p-2 px-2 max-h-max rounded-full"
                    onClick={async()=>{
                        try{
                            await useNotificationService.deleteNotification({notification})
                            refetch()
                            //dispatch(deleteNotification(notification))
                        }catch(e){
                            console.log(e)
                        }
                    }}
                />                    
            </div>
            <span className="self-end font-thin text-xs">{dayjs(notification.created_at).format('DD/MM/YYYY hh:mm')}</span>
        </div>
    )
}