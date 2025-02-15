import { createContext } from "react"

interface SiderBarContextModel{
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const SiderBarContext = createContext<SiderBarContextModel>({
    open:true,
    setOpen:()=>{}
})