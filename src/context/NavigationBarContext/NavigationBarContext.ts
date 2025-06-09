import { createContext } from "react"

interface NavigationBarContextInterface{
    show:boolean,
    setShow:(show:boolean)=>void
}

export const NavigationBarContext = createContext<NavigationBarContextInterface>({
    show:false,
    setShow:()=>{}
})