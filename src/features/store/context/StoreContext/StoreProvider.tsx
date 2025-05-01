import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface"
import { StoreContext } from "./StoreContext"

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