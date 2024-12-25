import { createContext } from "react";

interface TabsContextModel{
    value:number,
    setValue:(index:number)=>void,
}

export const TabsContext = createContext<TabsContextModel>({
    value:0,
    setValue:()=>{}
})