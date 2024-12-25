import { Avatar } from "@mui/material"
import { NotificationModel } from "../../models/notification"
import { twMerge } from "tailwind-merge"

interface NotifyCardProps{
    notification:NotificationModel,
    className?:string
}
export function NotifyCard({notification:{image,title,message},className=""}:NotifyCardProps){
    return(
        <div className={twMerge("w-full flex flex-row gap-x-3 "+className)}>
            <Avatar
                alt=""
                src={image}
                variant="rounded"
            />
            <div className="w-full h-full flex flex-col ">
                <h1 className="text-base font-semibold ">{title}</h1>
                <p className="text-sm font-light text-ellipsis overflow-hidden"  style={{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                    {message} 
                </p>
            </div>
        </div>
    )
}