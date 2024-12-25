import { useDispatch } from "react-redux";
import { OrderModel } from "../../models/Order";
import { useOrderService } from "../../services/orderService";
import { DeleteButton } from "./DeleteButton";
import { addOrder, OrderType, updateOrder } from "../../store/orderSlice";

interface DeleteOrderButtonProps{
    order:OrderModel,
}

export function DeleteOrderButton({order}:DeleteOrderButtonProps){
    const dispatch = useDispatch()
    return(
        order.status != 'CANCELED' ?  
        <DeleteButton
            onClick={async()=>{
                try{
                    const data = await useOrderService.deleteOrder({order})
                    dispatch(updateOrder({
                        order:data.data,
                        type:OrderType.COMPANY_ACTIVE
                    }))
                    dispatch(addOrder({
                        order:data.data,
                        type:OrderType.COMPANY_NO_ACTIVE
                    }))
                }catch(e){
                    console.log(e)
                }
            }}
        /> : null
    )
}