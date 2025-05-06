import { createContext } from "react"

interface ModalContextInterface{
    isOpen:boolean,
    setOpen:(state:boolean)=>void
}

export const ModalContext = createContext<ModalContextInterface>({
    isOpen:false,
    setOpen:()=>{}
})