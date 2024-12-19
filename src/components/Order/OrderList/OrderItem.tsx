import { FaStore } from "react-icons/fa6"
import { IconTextButton } from "../../Buttons/IconTextButton"
import { BlurCard } from "../../Cards/BlurCard"
import { IoMdCart } from "react-icons/io"
import { DeleteCartButton } from "../../buttons/DeleteCartButton"
import { OrderModel } from "../../../models/Order"
import { SIDEBAR_ICON_SIZE } from "../../../constraints"

export function OrderListItem({order}:{order:OrderModel}){
    return(
        <BlurCard className="flex flex-row gap-x-2 justify-between items-center h-20 py-4 ">
            <div></div>
        </BlurCard>
    )
}

/*
            <IconTextButton 
                icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} 
                label={`${order.store_name}`} 
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
            <DeleteCartButton thisCart={cart}/> */