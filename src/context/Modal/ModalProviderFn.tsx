import { useState } from "react"
import { ModalContext, ModalContextInterface } from "./ModalContext"

interface ModalProviderProps{
    initalValue?:boolean,
    children:(context:ModalContextInterface)=>React.ReactNode
}
export function ModalProviderFn({initalValue=false,children}:ModalProviderProps){
    const [isOpen,setOpen] = useState(initalValue)
    return(
        <ModalContext.Provider value={{isOpen,setOpen}}>
            <ModalContext.Consumer>
                {
                    (context)=>children(context)
                }
            </ModalContext.Consumer>
        </ModalContext.Provider>
    )
}

