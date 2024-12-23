import { Dialog } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../Dialog/DialogContext";

export function DialogApp({children}:{children:React.ReactNode}){
    const {open,setOpen} = useContext(DialogContext)
    return(
        <>
            <Dialog 
                maxWidth="lg"
                open={open} 
                onClose={()=>setOpen(false)}
                className="rounded-xl"
                PaperProps={{
                    style:{
                        backgroundColor:"#0f172a",
                        padding:"0px",
                        margin:"0px",
                        borderRadius:"0.75rem"
                    }
                }}
                sx={{
                    "& .MuiDialogContent-root":{
                        padding:"0px",
                        backgroundColor:"#0f172a",
                        borderRadius:"0.75rem"
                    }
                }}
                >
               {children}
            </Dialog>
        </>
    )
}