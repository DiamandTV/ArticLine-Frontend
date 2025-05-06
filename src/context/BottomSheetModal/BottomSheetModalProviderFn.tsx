import { useState } from "react";
import { BottomSheetModalContext, BottomSheetModalContextInterface } from "./BottomSheetModalContext";

interface BottomSheetModalProviderProps{
    children:(context:BottomSheetModalContextInterface)=>React.ReactNode
}
export function BottomSheetModalProviderFn({children}:BottomSheetModalProviderProps){
    const [isOpen,setOpen] = useState(false)
    return(
        <BottomSheetModalContext.Provider value={{isOpen,setOpen}}>
            <BottomSheetModalContext.Consumer>
                {
                    (context)=>children(context)
                }
            </BottomSheetModalContext.Consumer>
        </BottomSheetModalContext.Provider>
    )
}