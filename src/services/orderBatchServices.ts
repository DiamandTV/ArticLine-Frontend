import { api } from "./api"

export const useOrderBatchService = {
    serializeFromOrderBatchForm() {
        // going to serialize the order batch form and return the Order Batch Model to make the http requests
    },
    deserializeFromOrderBatch(){
        // goint to deserialize the order batch model data to order batch form data type to be able to set the defaults value of the form

    },
    async createOrderBatch(data:unknown){
       return api.post('/order/batch/',data) 
    }
}