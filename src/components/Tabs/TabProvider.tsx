import { useState } from "react";
import { TabsContext } from "./TabsContext";

export function TabsProvider({children}:{children:React.ReactNode}){
    const [value,setValue] = useState(0)

    return(
        <TabsContext.Provider value={{value,setValue}}>
            {children}
        </TabsContext.Provider>
    )
}