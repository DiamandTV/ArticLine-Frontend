import { useState } from "react";
import { DrawerContext } from "./DrawerContext";


interface DrawerProviderProps{
    children:React.ReactNode
}
export function DrawerProvider({children}:DrawerProviderProps){
    const [open,setOpen] = useState(false)
    return (
        <DrawerContext.Provider value={{open,setOpen}}>
            {children}
        </DrawerContext.Provider>
    )
} 