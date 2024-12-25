import { Popover } from "@mui/material";
import { useContext, useRef } from "react";
import { PopupContext } from "./PopupContext";

export function PopupApp({children}:{children:React.ReactNode}){
    const {open,setOpen} = useContext(PopupContext)
    const divRef = useRef<HTMLDivElement | null>(null)
    return(
        <div ref={divRef}>
            <Popover
                open={open}
                onClose={()=>setOpen(false)}
                anchorEl={divRef.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    "& .MuiPopover-paper":{
                        backgroundColor:"rgb(203, 213, 225,0.3)",
                        backdropFilter:"blur(100px)",
                        maxWidth:"max-content",
                        width:"max-content",
                        borderRadius:"0.75rem",
                    }
                }}
            >
                {children}
            </Popover>
        </div>
    )
}