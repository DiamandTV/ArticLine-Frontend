import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { StoreCategoryContext } from "./StoreCategoryContext";
import { useContext } from "react";

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

export function useStoreCategoryContext(){
    const context = useContext(StoreCategoryContext)
    if(context && context.storeCategory){
        return {
            storeCategory:context.storeCategory
        }
    }
    throw new Error("useStoreCategoryContext must be used within a StoreCategoryProvider")
}