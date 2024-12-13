import { createContext} from "react";

interface DialogContextModel{
    open:boolean,
    setOpen:(state:boolean)=>void
}


export const DialogContext = createContext<DialogContextModel>({
    open:false,
    setOpen:()=>{}
})