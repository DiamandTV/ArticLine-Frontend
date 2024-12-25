import { useState } from "react";
import { PopupContext } from "./PopupContext";

export function PopupProvider({children}:{children:React.ReactNode}){
    const [open,setOpen] = useState(false)
    return(
        <PopupContext.Provider value={{open,setOpen}}>
            {children}
        </PopupContext.Provider>
    )
}