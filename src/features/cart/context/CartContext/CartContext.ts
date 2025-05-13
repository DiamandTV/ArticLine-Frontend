import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";
import { createContext } from "react";

export interface CartContextInterface {
    cart?:CartInterface 
}

export const CartContext = createContext<CartContextInterface>({
    cart:undefined
})