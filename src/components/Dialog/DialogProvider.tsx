import { useState } from "react";
import { DialogContext } from "./DialogContext";

export function DialogProvider({children}:{children:React.ReactNode}){
    const [open,setOpen] = useState(false)
    return(
        <DialogContext.Provider value={{open,setOpen}}>
            {children}
        </DialogContext.Provider>
    )
}