import { useContext } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { PopupContext } from "../Popup/PopupContext";
import { Badge } from "@mui/material";

export function NotificationButton(){
    const {setOpen,open} = useContext(PopupContext)
    return(
        <div 
            className='max-w-max p-3 rounded-xl justify-self-end hover:cursor-pointer border-2 border-gray-700'
            onClick={()=>{
                setOpen(!open)
            }}
            >
            {open ? 
                <IoMdNotifications 
                    size={30}
                    color='white'
                /> : 
                <IoMdNotificationsOutline
                    size={30}
                    color='white'
                />
            }
        </div>
    )
}

export function NotificationButtonWithBadge(){
    return(
        <Badge
            badgeContent=" " 
            variant="dot"
            overlap="circular"
            color="warning"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
        >
        <NotificationButton/>
        </Badge>    
    )
}