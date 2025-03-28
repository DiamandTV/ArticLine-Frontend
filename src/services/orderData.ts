import { api } from "./api"

export const useOrderDataService = {
    async getOrderData({orderID,page_size=200,from,to,page="1"}:{orderID:number|string,page_size?:number,page?:string|number,from?:Dayjs,to?:Dayjs}){
        if(!from || !to){
          return await api.get(`order/data/${orderID}/?page=${page}`)  
        }
        const fromStr = from.format('YYYY-MM-DD HH:mm:ss')
        const toStr = to.format('YYYY-MM-DD HH:mm:ss')
        
        return await api.get(`order/data/${orderID}/?page_size=${page_size}&page=${page}&from=${fromStr}&to=${toStr}`)  
    }
}
