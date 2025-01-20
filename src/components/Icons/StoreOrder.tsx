import { FaClipboardUser, FaStore } from "react-icons/fa6";
import { Badge } from "@mui/material";

export function StoreOrderIcon({size}:{size:number}){
    return(
        <div className="w-full relative">
            <FaStore size={size}/>
            <FaClipboardUser size={size/1.5} className="absolute bottom-0 right-0"/>
        </div>
    )
}

export function StoreBadgeOrderIcon({size}:{size:number}){
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
            <StoreOrderIcon size={size}/>
        </Badge>
    )
}