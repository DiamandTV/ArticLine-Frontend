import { Dialog } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../Dialog/DialogContext";

interface DialogAppProps{
    open:boolean,
    setOpen:(state:boolean)=>void,
    children:React.ReactNode
}

export function DialogApp({open,setOpen,children}:DialogAppProps){
    return(
        <>
            <Dialog 
                maxWidth="lg"
                open={open} 
                onClose={()=>setOpen(false)}
                className="rounded-xl"
                PaperProps={{
                    style:{
                        backgroundColor:"#0f1720",
                        padding:"0px",
                        margin:"0px",
                        borderRadius:"0.75rem"
                    }
                }}
                sx={{
                    "& .MuiDialogContent-root":{
                        padding:"0px",
                        backgroundColor:"tranparent",
                        borderRadius:"0.75rem"
                    }
                }}
                >
               {children}
            </Dialog>
        </>
    )
}

export function DialogAppContext({children}:{children:React.ReactNode}){
    const {open,setOpen} = useContext(DialogContext)
    return(
        <DialogApp open={open} setOpen={setOpen}>{children}</DialogApp>
    )
}