import { CartItemInterface } from "@features/cart/model/CartItem/Interface/CartInterface";
import { createContext } from "react";

interface CartItemContextInterface {
    cartItem?:CartItemInterface
}

export const CartItemContext = createContext<CartItemContextInterface>({
    cartItem:undefined
})