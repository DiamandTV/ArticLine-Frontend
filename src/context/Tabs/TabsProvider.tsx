import { useContext, useState } from "react";
import { TabsContext } from "./TabsContext";

interface TabsProviderProps{
    defaultKey:string,
    children:React.ReactNode
}
export function TabsProvider({children,defaultKey}:TabsProviderProps){
    const [key,setKey] = useState<string>(defaultKey) 
    return(
        <TabsContext.Provider value={{key,setKey}}>
            {children}
        </TabsContext.Provider>
    )
}

export function useTabsContext(){
    const context = useContext(TabsContext)
    if(context){
        return context
    }
    throw new Error("useTabsContext can only me used within the TabsProvider")
}