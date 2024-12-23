import { BlurCard } from "./BlurCard";
//import { TextButton } from "../Buttons/TextButtons";
import { CardCartBottom } from "../Cart/CartCartBottom";
import { CartItems } from "../Cart/CartItems";
import { DeleteCartButton } from "../buttons/DeleteCartButton";
import { useContext } from "react";
import { CartContext } from "../Cart/CartProvider/CartContext";
import { twMerge } from "tailwind-merge";

export function CartCard({className=""}:{className?:string}){
    const {cart,classNames:{deleteCartButtonClassName}} = useContext(CartContext)
    return(
        cart ?
        <BlurCard className={twMerge(`bg-white rounded-xl max-h-max sticky top-0 max-w-sm ${className}`)}>
            <div className="w-full h-14 flex flex-row justify-between">
                <h1 className="text-xl">CART</h1>
                    <DeleteCartButton thisCart={cart} className={deleteCartButtonClassName}/>
            </div>
            <CartItems/>
            <CardCartBottom/>
        </BlurCard> : null
    )
}

