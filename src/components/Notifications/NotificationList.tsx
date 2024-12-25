import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { NotifyCard } from "../cards/NotifyCard"
import { DeleteButton } from "../Buttons/DeleteButton"
import dayjs from "dayjs"
import { useNotificationService } from "../../services/notificationsService"
import { NotificationModel } from "../../models/notification"
import { deleteNotification } from "../../store/notificationsSlice"
import { useContext } from "react"
import { PopupContext } from "../Popup/PopupContext"
import { v4 as uuidv4 } from 'uuid';

export function NotificationList(){
    const notifications = useSelector((state:RootState)=>state.notificationsReducer.notifications)
    return(
        <div className="w-full max-w-96 h-full max-h-96 flex flex-col gap-y-2 p-2 scrollbar-hide">
            {/*
                <div className="bg-white sticky top-0">
                    <HighlightedTitle title={"Notifications"} className="text-lg text-center"/>
                </div>
            */}
            {notifications.map((notification)=>{
                return (
                    <NotificationListItem notification={notification} key={uuidv4()}/>
                )
            })}
        </div>
    )
}


function NotificationListItem({notification}:{notification:NotificationModel}){
    const dispatch = useDispatch()
    const {setOpen} = useContext(PopupContext)
    const notifications = useSelector((state:RootState)=>state.notificationsReducer.notifications)
    return(
        <div className="w-full bg-white p-2 rounded-xl flex flex-col gap-y-1">
            <div className="w-full flex flex-row items-center gap-x-2">
                <NotifyCard notification={notification} />
                <DeleteButton
                    className="text-lg p-2 px-2 max-h-max rounded-full"
                    onClick={async()=>{
                        try{
                            await useNotificationService.deleteNotification({notification})
                            if(notifications.length == 1){
                                setOpen(false)
                            }
                            dispatch(deleteNotification(notification))
                            
                            
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