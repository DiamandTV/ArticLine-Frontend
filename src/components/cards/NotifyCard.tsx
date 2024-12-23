import { Avatar } from "@mui/material"
import { NotificationModel } from "../../models/notification"

interface NotifyCardProps{
    notification:NotificationModel
}
export function NotifyCard({notification:{image,title,message}}:NotifyCardProps){
    return(
        <div className="w-full flex flex-row gap-x-3">
            <Avatar
                src={image}
                variant="rounded"
            />
            <div className="w-full h-full flex flex-col ">
                <h1 className="text-base font-semibold ">{title}</h1>
                <p className="text-xs font-thin text-ellipsis overflow-hidden"  style={{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                    {message} 
                </p>
            </div>
        </div>
    )
}