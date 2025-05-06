import { useState } from "react";
import { BottomSheetModalContext } from "./BottomSheetModalContext";

export interface BottomSheetModalProviderProps{
    children:React.ReactNode
}
export function BottomSheetModalProvider({children}:BottomSheetModalProviderProps){
    const [isOpen,setOpen] = useState(false)
    return(
        <BottomSheetModalContext.Provider value={{isOpen,setOpen}}>
            {children}
        </BottomSheetModalContext.Provider>
    )
}