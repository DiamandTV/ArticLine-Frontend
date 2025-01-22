import { useMutation } from "@tanstack/react-query";
import { OrderBatchModelRequest, useOrderBatchService } from "../../services/orderBatchServices";
import { TextButton } from "../Buttons/TextButtons";
import { OrderBatchForm } from "./OrderBatchForm";
import { checkForError } from "../../constraints";
import { useDispatch } from "react-redux";
import { addOrder, OrderType } from "../../store/orderSlice";
import { OrderBatchModel } from "../../models/Order";

export function OrderBatchCreate(){
    const dispatch = useDispatch()

    const {mutateAsync} = useMutation({
        mutationKey:['company-create-order-batch'],
        mutationFn:async(orderBatchData:OrderBatchModelRequest)=>{
            return await useOrderBatchService.createOrderBatch(orderBatchData)
        },
        onSuccess:(data)=>{
            console.log(data)
            if(data && data.data){
                dispatch(addOrder({
                    order:data.data as OrderBatchModel,
                    type:OrderType.COMPANY_ACTIVE_BATCH
                }))
            }
        },
    })
    return(
        <OrderBatchForm
            onSubmitForm={async(orderBatchInfo)=>{
                console.log(orderBatchInfo)
                // create the order batch
                const orderBatchToSend = useOrderBatchService.serializeFromOrderBatchForm(orderBatchInfo)
                console.log(orderBatchToSend)
                try{
                    await mutateAsync(orderBatchToSend)
                }catch(e){
                    console.log(e)
                    return checkForError(e)
                }
            }}
            >
            <TextButton
                type="submit"
                text="CREATE THE BATCH"
            />
        </OrderBatchForm>
    )
}