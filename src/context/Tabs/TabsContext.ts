import { createContext } from "react"

interface TabContextInterface{
    key:string,
    setKey:(key:string)=>void
}

export const TabsContext = createContext<TabContextInterface>({
    key:'',
    setKey:()=>{}
})