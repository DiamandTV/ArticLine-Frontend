import React, { useState } from "react";
import { SiderBarContext } from "./SiderBarContext";

export function SiderBarProvider({children}:{children:React.ReactNode}){
    const [open,setOpen] = useState(false)
    return(
        <SiderBarContext.Provider value={{open,setOpen}}>
            {children}
        </SiderBarContext.Provider>   
    )
}