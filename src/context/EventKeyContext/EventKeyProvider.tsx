import { useContext, useState } from "react"
import { EventKeyContext, EventKeyContextInterface } from "./EventKeyContext"

interface EventKeyProviderProps{
    defaultEventKey?:string
    children:React.ReactNode
}
export function EventKeyProvider({defaultEventKey="",children}:EventKeyProviderProps){
    const [eventKey,setEventKey] = useState<string>(defaultEventKey)
    return(
        <EventKeyContext.Provider value={{eventKey,setEventKey}}>
            {children}
        </EventKeyContext.Provider>
    )
}

interface EventKeyProviderFnProps{
    defaultEventKey:string
    children:(context:EventKeyContextInterface)=>React.ReactNode
}
export function EventKeyProviderFn({defaultEventKey,children}:EventKeyProviderFnProps){
    const [eventKey,setEventKey] = useState<string>(defaultEventKey)
    return(
        <EventKeyContext.Provider value={{eventKey,setEventKey}}>
            <EventKeyContext.Consumer>
                {
                    (context)=>children(context)
                }
            </EventKeyContext.Consumer>
        </EventKeyContext.Provider>
    )
}

export function useEventKeyContext(){
    return useContext(EventKeyContext)
}