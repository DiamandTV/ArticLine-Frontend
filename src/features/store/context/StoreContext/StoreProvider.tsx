import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface"
import { StoreContext } from "./StoreContext"
import { useContext } from "react"

interface StoreProviderProps {
    store:StoreInterface,
    children:React.ReactNode

}
export function StoreProvider({store,children}:StoreProviderProps){
    return(
        <StoreContext.Provider value={{store}}>
            {children}
        </StoreContext.Provider>
    )
}

export function useStoreContext(){
    const context = useContext(StoreContext)
    if(context && context.store){
        return {store:context.store}
    }

    throw new Error("useStoreContext must be used within a StoreProvider")
}