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
        return api.get(`/orders/inactive/company/?page=${page}`)
    },
    async getActiveCompanyOrders({page='1',search="",added=[]}:{page?:string|null|number,search?:string,added?:Array<int>}){
        const data = await api.get(`/orders/active/company/?page=${page}&added=${JSON.stringify(added)}&search=${search}`)
        console.error(data)
        return data
    },
    async updateOrderStatus({order}:{order:OrderModel}){
        return api.patch(`/order/active/company/status/update/${order.id}`)
    },
    async updateOrderDeliveryTime({order,delivery_time}:{order:OrderModel,delivery_time:string}){
        return api.patch(`/order/active/company/delivery_time/update/${order.id}`,{delivery_time})
    },
    async updateOrderDelayTime({order,delay_time}:{order:OrderModel,delay_time:string}){
        console.log(delay_time)
        return api.patch(`/order/active/company/delay_time/update/${order.id}`,{delay_time})
    },
    async updateOrderCourier({order,courier}:{order:OrderModel,courier?:CourierProfileModel}){
        return api.patch(`/order/active/company/courier/update/${order.id}`,{courier_id:courier?.id})
    },
    async deleteOrder({order}:{order:OrderModel}){
        return api.patch(`/order/active/company/delete/${order.id}`)
    },

    // ? ORDER BATCH SERVICE
    async createOrderBatch(){
        return api.patch(``)
    },
    async getActiveCompanyOrdersBatch({page='1'}:{page?:string|number|null}){
        return api.get(`/orders/batch/active/?page=${page}`)
    }
}