import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface"
import { ProductContext } from "./ProductContext"

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