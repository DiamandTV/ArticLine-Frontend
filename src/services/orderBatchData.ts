import { Dayjs } from "dayjs"
import { api } from "./api"

export const useOrderBatchDataService = {
    async getOrderBatchData({orderBatchID,from,to,page="1"}:{orderBatchID:number|string,page?:string|number,from?:Dayjs,to?:Dayjs}){
      if(!from || !to){
        return await api.get(`orders/batch/data/${orderBatchID}/?page=${page}`)  
      }
      const fromStr = from.format('YYYY-MM-DD HH:MM')
      const toStr = to.format('YYYY-MM-DD HH:MM')
      
      return await api.get(`orders/batch/data/${orderBatchID}/?page=${page}&from=${fromStr}&to=${toStr}`)  
    }
}