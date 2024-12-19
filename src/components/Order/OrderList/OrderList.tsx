import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { OrderListItem } from "./OrderItem"

export function OrderList(){
    const orders = useSelector((state:RootState)=>state.orderReducer.orders)
        
    return(
        orders ?
            <div className="w-full flex flex-col justify-start gap-y-2">
                {orders.map((order)=>{
                    return(
                        <OrderListItem order={order}/>
                    )
                })}
            </div>
        : null
    )
}