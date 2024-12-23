import { createContext } from "react";
import { CartModel } from "../../../models/cart";
import { StoreModel } from "../../../models/store";

interface CartContextMode{
    cart:CartModel|null,
    store:StoreModel|null,
    classNames:{
        deleteCartButtonClassName:string,
        counterClassName:string,
        productClassName:string,
        deleteProductButtonClassName:string,
        detailsClassName:string
    }
}

export const CartContext = createContext<CartContextMode>({
    cart:null,
    store:null,
    classNames:{
        deleteCartButtonClassName:"",
        counterClassName:"",
        productClassName:"",
        deleteProductButtonClassName:"",
        detailsClassName:""
    }
})