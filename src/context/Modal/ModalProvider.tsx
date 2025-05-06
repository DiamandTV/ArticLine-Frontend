import { useState } from "react"
import { ModalContext } from "./ModalContext"

interface ModalProviderProps{
    children:React.ReactNode
}
export function ModalProvider({children}:ModalProviderProps){
    const [isOpen,setOpen] = useState(false)
    return(
        <ModalContext.Provider value={{isOpen,setOpen}}>
            {children}
        </ModalContext.Provider>
    )
}