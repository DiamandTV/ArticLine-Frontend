import { useMutation } from "@tanstack/react-query"
import { OrderBatchModelRequest, useOrderBatchService } from "../../services/orderBatchServices"
import { TextButton } from "../Buttons/TextButtons"
import { OrderBatchForm } from "./OrderBatchForm"
import { useDispatch } from "react-redux"
import { OrderType, updateOrder } from "../../store/orderSlice"
import { OrderBatchModel } from "../../models/Order"
import { checkForError } from "../../constraints"
import { useContext } from "react"
import { OrderBatchContext } from "../OrderCompanyBatch/OrderBatchContext/OrderBatchContext"

export function OrderBatchEdit(){
    const dispatch = useDispatch()
    const {orderBatch} = useContext(OrderBatchContext)
    const {mutateAsync} =  useMutation({
        mutationKey:['update-order-batch'],
        mutationFn: async(orderBatchData:OrderBatchModelRequest)=>{
            return await useOrderBatchService.updateOrderBatch(orderBatchData)
        },
        onSuccess:(data)=>{
            if(data && data.data){
                dispatch(updateOrder({
                    order:data.data as OrderBatchModel,
                    type:OrderType.COMPANY_ACTIVE_BATCH
                }))
            }
        },
    })
    if (!orderBatch) return;
    return(
            <OrderBatchForm
                defaultValue={useOrderBatchService.deserializeFromOrderBatch(orderBatch!)}
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
                    text="EDIT THE BATCH"
                />
            </OrderBatchForm>
    )
}