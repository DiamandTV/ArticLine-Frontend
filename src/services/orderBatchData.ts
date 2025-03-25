import { Dayjs } from "dayjs"
import { api } from "./api"

export const useOrderBatchDataService = {
    async getOrderBatchData({orderBatchID,page_size=200,from,to,page="1"}:{orderBatchID:number|string,page_size?:number,page?:string|number,from?:Dayjs,to?:Dayjs}){
      if(!from || !to){
        return await api.get(`orders/batch/data/${orderBatchID}/?page=${page}`)  
      }
      const fromStr = from.format('YYYY-MM-DD HH:mm:ss')
      const toStr = to.format('YYYY-MM-DD HH:mm:ss')
      
      return await api.get(`orders/batch/data/${orderBatchID}/?page_size=${page_size}&page=${page}&from=${fromStr}&to=${toStr}`)  
    }
}