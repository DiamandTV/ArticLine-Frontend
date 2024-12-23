import { CartModel } from "../../../models/cart";
import { CartContext } from "./CartContext";
import { StoreModel } from "../../../models/store";
import { useEffect } from "react";

interface CartProviderProps{
    cart:CartModel,
    store?:StoreModel|null,
    children:React.ReactNode,
    classNames?:{
        deleteCartButtonClassName?:string,
        counterClassName?:string,
        productClassName?:string,
        deleteProductButtonClassName?:string,
        detailsClassName?:string
    }
}
export function CartProvider({cart,children,store=null,classNames={deleteCartButtonClassName:"",counterClassName:"",productClassName:"",deleteProductButtonClassName:""}}:CartProviderProps){
    useEffect(()=>{
        console.log(cart)
    },[cart])
    return (
        <CartContext.Provider value={{cart,store,classNames}}>
            {cart ? children : null}
        </CartContext.Provider>
    )
}