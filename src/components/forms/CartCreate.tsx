import { useMutation } from "@tanstack/react-query";
import { CartModel } from "../../models/cart";
import { TextButton } from "../Buttons/TextButtons";
import { CartForm } from "./CartForm";
import { useOrderService } from "../../services/orderService";
import { OrderModel } from "../../models/Order";
import { checkForError } from "../../constraints";

export function CartCreate({cart}:{cart:CartModel}){
    const {mutateAsync} = useMutation({
        mutationKey:['create-order',cart.id],
        mutationFn:async(order:OrderModel)=>useOrderService.createOrder({order}),
        onSuccess:(data)=>{

        }
    })
    return(
        <CartForm
            onSubmitForm={async(cartInfo)=>{
                console.log(cartInfo)
                const order:OrderModel = {
                    request_earliest_delivery:cartInfo.request_earliest_delivery,
                    delivery_time:cartInfo.delivery_time,
                    cart:cart.id!
                }
                console.log(order)
                try{
                    await mutateAsync(order)   
                } catch(e){
                    return checkForError(e)
                }
            }}
        >
            <TextButton
                    className="mt-auto"
                    text="ORDER"
                    type="submit"
                    onClick={()=>{

                    }}
                />
        </CartForm>

    )
}