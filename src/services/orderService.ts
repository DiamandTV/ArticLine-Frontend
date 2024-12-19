import { OrderModel } from "../models/Order";
import { api } from "./api";

export const useOrderService = {
    async createOrder({order}:{order:OrderModel}){
        return api.post('/order/details/',order)
    },
    async getOrders({page='1'}:{page?:string|null|number}){
        return api.get(`/order/details/?page=${page}`)
    }
}