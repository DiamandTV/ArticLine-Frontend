import { useContext, useState } from "react"
import { PasswordActualContext } from "./PasswordActualContext"

interface PasswordActualProviderProps{
    children:React.ReactNode
}

export function PasswordActualProvider({children}:PasswordActualProviderProps){
    const [actual_password,setActualPassword] = useState('')
    return(
        <PasswordActualContext.Provider value={{actual_password,setActualPassword}}>
            {children}
        </PasswordActualContext.Provider>
    )
}

export function usePasswordActualContext(){
    return useContext(PasswordActualContext)
}