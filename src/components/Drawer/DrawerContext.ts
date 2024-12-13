import { createContext } from "react";
export interface DrawerContextModel{
    open:boolean,
    setOpen:(state:boolean)=>void
}
export const DrawerContext = createContext<DrawerContextModel>({
    open:false,
    setOpen:()=>{}
})