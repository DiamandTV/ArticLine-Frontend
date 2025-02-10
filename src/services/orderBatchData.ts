import { OrderBatchModel } from "../models/Order"
import { api } from "./api"

export const useOrderBatchDataService = {
    async getOrderBatchData({orderBatchID}:{orderBatchID:number|string}){
      return await api.get(`orders/batch/data/${orderBatchID}/`)  
    }
}