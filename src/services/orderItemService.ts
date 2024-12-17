import { OrderItemModel } from "../models/Order";
import { api } from "./api";

export const useOrderItemService = {
    async updateOrderItem({orderItem}:{orderItem:OrderItemModel}):Promise<OrderItemModel|null>{
        try{
            const data = await api.put(`/store/cart/order_items/${orderItem.id}/update`,orderItem)
            if(data && data.data) return data.data as OrderItemModel
        }catch(e){
            console.log(e)
        }
        return null
    },
    async deleteOrderItem({orderItem}:{orderItem:OrderItemModel}):Promise<boolean>{
        try{
            await api.delete(`/store/cart/order_items/${orderItem.id}/delete`)
            return true
        }catch(e){
            console.log(e)
        }
        return false
    }
}