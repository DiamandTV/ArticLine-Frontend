import { OrderModel } from "../models/Order";
import { api } from "./api";

export const useOrderService = {
    async createOrder({order}:{order:OrderModel}){
        return api.post('/order/details/',order)
    },
    async getOrders(){
        return api.get('/order/details/')
    }
}