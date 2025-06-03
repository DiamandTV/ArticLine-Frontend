import { createContext, } from "react"

export interface BottomSheetModalContextInterface{
    isOpen:boolean,
    setOpen:(state:boolean)=>void,
}

export const BottomSheetModalContext = createContext<BottomSheetModalContextInterface>({
    isOpen:false,
    setOpen:()=>{}
})

