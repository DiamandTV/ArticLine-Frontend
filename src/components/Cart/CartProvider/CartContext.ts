import { createContext } from "react";
import { CartModel } from "../../../models/cart";
import { StoreModel } from "../../../models/store";

interface CartContextMode{
    cart:CartModel|null,
    store:StoreModel|null
}

export const CartContext = createContext<CartContextMode>({
    cart:null,
    store:null
})