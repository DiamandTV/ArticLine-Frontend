import { useDispatch } from "react-redux";
import { OrderModel } from "../../models/Order";
import { useOrderService } from "../../services/orderService";
import { DeleteButton } from "./DeleteButton";
import { OrderType, removeOrder } from "../../store/orderSlice";

interface DeleteOrderButtonProps{
    order:OrderModel,
}

export function DeleteOrderButton({order}:DeleteOrderButtonProps){
    const dispatch = useDispatch()
    return(
        <DeleteButton
            onClick={async()=>{
                try{
                    await useOrderService.deleteOrder({order})
                    dispatch(removeOrder({
                        order:order,
                        type:OrderType.COMPANY_ACTIVE
                    }))
                }catch(e){
                    console.log(e)
                }
            }}
        />
    )
}