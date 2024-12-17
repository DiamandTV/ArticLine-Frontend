import { useMemo } from "react";
import { CartModel } from "../../models/cart";
import { OrderItemModel } from "../../models/Order";
import { TextButton } from "../Buttons/TextButtons";
import { useNavigate } from "react-router-dom";
import { StoreModel } from "../../models/store";
import { ProductModel } from "../../models/Product";

interface CardCartBottomProps{
    cart:CartModel,
    store?:StoreModel
}

function getTotal(cart:CartModel){
    let total = 0
    cart.order_items.forEach((orderItem:OrderItemModel)=>total+=(orderItem.product_item as ProductModel).price * orderItem.product_quantity)
    return total
}
export function CardCartBottom({cart,store}:CardCartBottomProps){
    const navigate = useNavigate()
    const total = useMemo(()=>getTotal(cart),[cart])
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
                        navigate(`/checkout/payment/${store?.id}`)
                    }}
                /> : null
            }
        </div>
    )
}