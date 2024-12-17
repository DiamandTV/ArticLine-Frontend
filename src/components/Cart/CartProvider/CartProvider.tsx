import { CartModel } from "../../../models/cart";
import { CartContext } from "./CartContext";
import { StoreModel } from "../../../models/store";
import { useEffect } from "react";

interface CartProviderProps{
    cart:CartModel,
    store?:StoreModel|null,
    children:React.ReactNode
}
export function CartProvider({cart,children,store=null}:CartProviderProps){
    useEffect(()=>{
        console.log(cart)
    },[cart])
    return (
        <CartContext.Provider value={{cart,store}}>
            {cart ? children : null}
        </CartContext.Provider>
    )
}