import { useState } from "react";
import { BottomSheetModalContext, BottomSheetModalContextInterface } from "./BottomSheetModalContext";

interface BottomSheetModalProviderProps{
    initalValue?:boolean,
    children:(context:BottomSheetModalContextInterface)=>React.ReactNode
}
export function BottomSheetModalProviderFn({initalValue=false,children}:BottomSheetModalProviderProps){
    const [isOpen,setOpen] = useState(initalValue)
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