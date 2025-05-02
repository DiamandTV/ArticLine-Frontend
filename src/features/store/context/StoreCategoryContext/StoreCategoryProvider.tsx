import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { StoreCategoryContext } from "./StoreCategoryContext";

interface StoreCategoryProviderProps{
    storeCategory:StoreCategoryInterface,
    children:React.ReactNode
}
export function StoreCategoryProvider({children,storeCategory}:StoreCategoryProviderProps){
    return(
        <StoreCategoryContext.Provider value={{storeCategory}}>
            {children}
        </StoreCategoryContext.Provider>
    )
}