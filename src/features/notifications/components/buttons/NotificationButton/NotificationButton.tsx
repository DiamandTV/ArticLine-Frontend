import { Badge } from "@components/Badge/Badge";
import {IoNotifications } from "react-icons/io5";
interface NotificationButtonProps extends React.HTMLAttributes<HTMLElement>{
    newNotiNumber?:number
}
export function NotificationButton({newNotiNumber,...props}:NotificationButtonProps){
    return(
        <Badge
            badgeContent={newNotiNumber?.toString()}
            {...props}
        >
            <IoNotifications className="text-2xl md:text-4xl text-surface-a30"/>
        </Badge>
    )
}