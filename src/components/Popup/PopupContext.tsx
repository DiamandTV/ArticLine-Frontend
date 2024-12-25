import { createContext } from "react";

interface PopupContextModel{
    open:boolean,
    setOpen:(newState:boolean)=>void
}

export const PopupContext = createContext<PopupContextModel>({
    open:false,
    setOpen:()=>{}
})