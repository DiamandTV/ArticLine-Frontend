import { useState } from "react"
import { ModalContext } from "./ModalContext"

interface ModalProviderProps{
    initialValue?:boolean,
    children:React.ReactNode,
    
    isOpen?:boolean,
    setOpen?:()=>void
}
export function ModalProvider({initialValue=false,children,...props}:ModalProviderProps){
    const [isOpen,setOpen] = useState(initialValue)
    return(
        <ModalContext.Provider value={{ isOpen:props.isOpen ?? isOpen,setOpen:props.setOpen ?? setOpen}}>
            {children}
        </ModalContext.Provider>
    )
}


