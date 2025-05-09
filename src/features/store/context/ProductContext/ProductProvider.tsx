import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface"
import { ProductContext } from "./ProductContext"
import { useContext } from "react"

interface ProductProviderProps{
    product:ProductInterface,
    children:React.ReactNode
}
export function ProductProvider({product,children}:ProductProviderProps){
    return(
        <ProductContext.Provider value={{product}}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProductContext(){
    const context = useContext(ProductContext)
    if(context && context.product){
        return {
            product:context.product
        }
    }
    throw new Error("useProductContext must be used within a ProductProvider")
}