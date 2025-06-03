import { RefObject, useContext } from "react"
import { DivRefContext } from "./DivRefContext"

interface DivRefProviderProps{
    divRef:RefObject<HTMLDivElement|null>
    children:React.ReactNode
}

export function DivRefProvider({divRef,children}:DivRefProviderProps){
    return(
        <DivRefContext.Provider value={{divRef}}>
            {children}
        </DivRefContext.Provider>
    )
}

export function useDivRefContext(){
    const context = useContext(DivRefContext)
    if(context){
        return {...context,divRef:context.divRef!}
    }
    throw new Error("useDivRefContext can only be used within DivRefProvider")
}