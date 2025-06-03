import { createContext } from "react"

export interface EventKeyContextInterface{
    eventKey:string,
    setEventKey:(eventKey:string)=>void
}

export const EventKeyContext = createContext<EventKeyContextInterface>({
    eventKey:'',
    setEventKey:()=>{}
})
