import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";
import { createContext } from "react";

interface CartContextInterface {
    carts:Array<CartInterface>
}

export const CartContext = createContext<CartContextInterface>({
    carts:[]
})