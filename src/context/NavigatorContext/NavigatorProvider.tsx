import { NavigateFunction } from "react-router"
import { NavigatorContext } from "./NavigatorContext"

interface NavigatorProviderProps{
    navigator:NavigateFunction,
    children:React.ReactNode

}
export function NavigatorProvider({children,navigator}:NavigatorProviderProps){
    return(
        <NavigatorContext.Provider value={navigator}>
            {children}
        </NavigatorContext.Provider>
    )
}