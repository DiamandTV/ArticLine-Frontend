import { useContext } from "react"
import { CartItem } from "./CartItem"
import {v4 as uuid} from "uuid"
import { CartContext } from "./CartProvider/CartContext"

export function CartItems(){
    const {cart} = useContext(CartContext)
    if(!cart) return;
    return ( 
        <div className="w-full flex flex-col my-4 border-2 border-slate-400 rounded-xl p-2 max-h-96 overflow-y-scroll scrollbar-hide ">
            {/* 
                //todo: maybe it's better to use fized list of react window
            */}
            {
                cart.order_items.map((orderItem)=>{
                    console.log(orderItem)
                    return (
                        <>
                            <CartItem key={uuid()} orderItem={orderItem}/>
                        </>
                    )
                })
            }
        </div>
    )
}