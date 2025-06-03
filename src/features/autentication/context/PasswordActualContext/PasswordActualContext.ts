import { createContext } from "react"

export interface PasswordActualContextInterface{
    actual_password:string,
    setActualPassword:(actual_password:string)=>void
}

export const PasswordActualContext = createContext<PasswordActualContextInterface>({
    actual_password:'',
    setActualPassword:()=>{}
})