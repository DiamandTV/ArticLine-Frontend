import { useContext, useState } from "react"
import { NavigationBarContext } from "./NavigationBarContext"

export function NavigationBarProvider({children}:{children:React.ReactNode}){
    const [show,setShow] = useState(false)
    return(
        <NavigationBarContext.Provider value={{show,setShow}}>
            {children}
        </NavigationBarContext.Provider>
    )
}

export function useNavigationBarContext(){
    const context = useContext(NavigationBarContext)
    if(context){
        return context
    }
    throw new Error("useNavigationBarContext can only be used within NavigationBarProvider")
}