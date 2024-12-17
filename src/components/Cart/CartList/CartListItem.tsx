import { IoMdCart } from "react-icons/io";
import { CartModel } from "../../../models/cart";
import { DeleteCartButton } from "../../buttons/DeleteCartButton";
import { IconTextButton } from "../../Buttons/IconTextButton";
import { BlurCard } from "../../Cards/BlurCard";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { FaStore } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CartListItemProps{
    cart:CartModel
}
export function CartListItem({cart}:CartListItemProps){
    const navigate = useNavigate()
    const items = cart.order_items.reduce((previous,current)=>previous+current.product_quantity,0)
    return(
        <BlurCard className="flex flex-row gap-x-2 justify-between items-center h-20 py-4 ">
            <IconTextButton 
                icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} 
                label={`${cart.store_name}`} 
                onClick={()=>{
                    navigate(`/store/details/${cart.store}/`)
                }}
                className="flex flex-row-reverse mr-auto max-w-max py-2 text-lg"
            />

            <IconTextButton 
                icon={<IoMdCart size={SIDEBAR_ICON_SIZE}/>} 
                label={`${items}x`} 
                onClick={()=>{
                    navigate(`/carts/checkout/payment/${cart.id}`)
                }}
                className="ml-auto max-w-max py-2 text-base font-mono"
            />
            <DeleteCartButton thisCart={cart}/>
        </BlurCard>
    )
}