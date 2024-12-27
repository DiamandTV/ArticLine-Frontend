import { CourierProfileModel } from "../models/Courier";
import { OrderModel } from "../models/Order";
import { api } from "./api";

export const useOrderService = {
    async createOrder({order}:{order:OrderModel}){
        return api.post('/order/details/',order)
    },
    async getOrders({page='1'}:{page?:string|null|number}){
        return api.get(`/order/details/?page=${page}`)
    },
    async getInActiveCompanyOrders({page='1'}:{page?:number|null|string}){
        return api.get(`orders/inactive/company/?page=${page}`)
    },
    async getActiveCompanyOrders({page='1'}:{page?:string|null|number}){
        return api.get(`orders/active/company/?page=${page}`)
    },
    async updateOrderStatus({order}:{order:OrderModel}){
        return api.patch(`order/active/company/status/update/${order.id}`)
    },
    async updateOrderDeliveryTime({order,delivery_time}:{order:OrderModel,delivery_time:string}){
        return api.patch(`order/active/company/delivery_time/update/${order.id}`,{delivery_time})
    },
    async updateOrderCourier({order,courier}:{order:OrderModel,courier?:CourierProfileModel}){
        return api.patch(`order/active/company/courier/update/${order.id}`,{courier_id:courier?.id})
    },
    async deleteOrder({order}:{order:OrderModel}){
        return api.patch(`order/active/company/delete/${order.id}`)
    }

}