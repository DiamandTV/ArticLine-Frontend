import { useContext, useMemo } from "react";
import { CartModel } from "../../models/cart";
import { OrderItemModel } from "../../models/Order";
import { TextButton } from "../Buttons/TextButtons";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../models/Product";
import { CartContext } from "./CartProvider/CartContext";

function getTotal(cart:CartModel){
    let total = 0
    cart.order_items.forEach((orderItem:OrderItemModel)=>total+=(orderItem.product_item as ProductModel).price * orderItem.product_quantity)
    return total
}
export function CardCartBottom(){
    const navigate = useNavigate()
    const {cart,store} = useContext(CartContext)
    const total = useMemo(()=>getTotal(cart!),[cart])
    return(
        <div className="w-full flex flex-col gap-y-2">
            <div className="w-full flex flex-row justify-between items-center pr-3">
                <span className="text-lg">TOTAL </span>
                <span className="text-lg font-semibold">{total} $</span>
            </div>
            {store ?
                <TextButton
                    text="CHECKOUT"
                    onClick={()=>{
                        navigate(`/carts/checkout/payment/${cart!.id}`)
                    }}
                /> : null
            }
        </div>
    )
}