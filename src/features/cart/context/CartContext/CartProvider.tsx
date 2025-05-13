import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface"
import { CartContext } from "./CartContext"
import { useContext } from "react"

interface CartProviderProps{
    cart?:CartInterface,
    children:React.ReactNode
}
export function CartProvider({cart,children}:CartProviderProps){
    return(
        <CartContext.Provider value={{cart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext(){
    const context = useContext(CartContext)
    if(context){
        return context
    }
    throw new Error("useCartContext must be used only within CartProvider")
}