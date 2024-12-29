import { StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { useOrderService } from "../../services/orderService";
import { OrderContext } from "../OrderCompany/OrderContext/OrderContext";
import { useDispatch } from "react-redux";
import { OrderType, updateOrder } from "../../store/orderSlice";
import { OrderModel } from "../../models/Order";

// the store owner has to choose a delivery time if the request time delivery is set to true
// the store owner can set the delivery time only once so he needs to be very carefull
export function DelayForm(){
    const {order} = useContext(OrderContext)
    const dispatch = useDispatch()
    const [value,setValue] = useState<Dayjs | null>(null)
    const onAccept = async (value:Dayjs|null)=>{
        // the store owner has set the time so save it in the db . Notify the user only when the order has been accepted
        if (!order || !value) return
        try{
            const data = await useOrderService.updateOrderDelayTime({order,delay_time:value!.format()})
            if(data && data.data){
                dispatch(updateOrder({
                    order:data.data as OrderModel,
                    type:OrderType.COMPANY_ACTIVE
                }))
            }
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
        <StaticDateTimePicker value={value} onChange={(value)=>setValue(value)} onAccept={async(value)=>await onAccept(value)} minDateTime={dayjs(order!.delivery_time!)}/>
        </>
    )
}