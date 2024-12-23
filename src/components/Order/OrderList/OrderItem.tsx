import { BlurCard } from "../../Cards/BlurCard"
import { OrderModel } from "../../../models/Order"

export function OrderListItem({order}:{order:OrderModel}){
    return(
        <BlurCard className="flex flex-row gap-x-2 justify-between items-center h-20 py-4 ">
            <div>sd</div>
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