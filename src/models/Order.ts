import { Dayjs } from "dayjs"
import { CompanyProfileModel } from "./company"
import { ProductModel } from "./Product"
import { UserProfileModel } from "./user"
import { CartModel } from "./cart"
import { CourierProfileModel } from "./Courier"
import { DeviceModel } from "./Device"
//import { StoreModel } from "./store"
// export type CartModel = Record<number|string,OrderItemModel> 
// export type StoreToCartModel = Record<number|string,CartModel>

export type OrderStatus = 'NOT ACCEPTED'|'ACCEPTED'|'WORKING ON'|'READY'|'SENDED'|'DELIVERED'|'CANCELED'

export type OrderBatchStatus = 'PENDING' | 'PICKED UP' | 'IN PROGRESS' | 'COMPLETED'

export const STATUS_INDEX:Record<OrderStatus,number> = {
    'NOT ACCEPTED'  :   0,
    'ACCEPTED'      :   1,
    'WORKING ON'    :   2,
    'READY'         :   3,
    'SENDED'        :   4,
    'DELIVERED'     :   5,
    'CANCELED'      :   1000
}

export const ORDER_BATCH_STATUS_INDEX:Record<OrderBatchStatus,number> = {
    'PENDING'       :   0,
    'PICKED UP'    :   1,
    'IN PROGRESS'   :   2,
    'COMPLETED'      :   3
}   

export interface OrderModel{
    id?:number,
    order?:number,
    order_batch?:number,
    total_price?:number,
    status?:OrderStatus,
    profile?:UserProfileModel | CompanyProfileModel,
    //order_items:Array<OrderItemModel>,
    //store:StoreModel,
    delay_time?:string | Dayjs | null,
    delivery_time?:string | Dayjs | null,
    request_earliest_delivery:boolean,
    delivered_time?:string | Dayjs,
    created_at?:string | Dayjs,
    canceled_at?:string | Dayjs,
    cart:CartModel,
    //courier?:CourierProfileModel
}

export interface OrderBatchModel {
    id?:number,
    title:string,
    status:OrderBatchStatus,
    orders?:Array<OrderModel>,
    device?:DeviceModel,
    company?:CompanyProfileModel,
    courier?:CourierProfileModel,
    pickup_time?:Dayjs|string,
    pickedup_time?:string,
    finished_time?:string,
    created_at?:Dayjs|string,
}

export interface OrderBatchDataModel{
    id:number,
    order_batch:number,
    temperature:number,
    humidity:number,
    battery:number,
    created_at:string
}

export interface OrderItemModel{
    id?:number,
    product_item:ProductModel|number,
    product_quantity:number,
    order?:number
}