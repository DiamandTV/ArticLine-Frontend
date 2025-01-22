import dayjs, { Dayjs } from "dayjs"
import { OrderBatchFormFields } from "../components/forms/OrderBatchForm"
import { api } from "./api"

export interface OrderBatchModelRequest {
    id?:number,
    orders?:Array<number>,
    device?:number,
    courier?:number,
    pickup_time?:Dayjs|string,
    created_at?:Dayjs|string,
}

export const useOrderBatchService = {
    serializeFromOrderBatchForm(orderBatchInfo:OrderBatchFormFields):OrderBatchModelRequest{
        // going to serialize the order batch form and return the Order Batch Model to make the http requests
        return {
            id:orderBatchInfo.id,
            orders:orderBatchInfo.orders.ids ?? [],
            device:orderBatchInfo.device.id,
            courier:orderBatchInfo.courier.id,
            pickup_time: dayjs(orderBatchInfo.pickup_time).format("YYYY-MM-DD"),
        }
    },
    // deserializeFromOrderBatch(orderBatch:OrderBatchModel):OrderBatchFormFields{
    //     // goint to deserialize the order batch model data to order batch form data type to be able to set the defaults value of the form

    // },
    async createOrderBatch(data:OrderBatchModelRequest){
       return api.post('/order/batch/',data) 
    }
}