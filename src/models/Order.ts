import { Dayjs } from "dayjs"
import { CompanyProfileModel } from "./company"
import { ProductModel } from "./Product"
import { UserProfileModel } from "./user"
import { CartModel } from "./cart"
//import { StoreModel } from "./store"
// export type CartModel = Record<number|string,OrderItemModel> 
// export type StoreToCartModel = Record<number|string,CartModel>

export type OrderStatus = 'NOT ACCEPTED'|'ACCEPTED'|'WORKING ON'|'SENDED'|'DELIVERED'|'CANCELED'

export const STATUS_INDEX = {
    'NOT ACCEPTED'  :   0,
    'ACCEPTED'      :   1,
    'WORKING ON'    :   2,
    'SENDED'        :   3,
    'DELIVERED'     :   4,
}

export interface OrderModel{
    id?:number,
    total_price?:number,
    status?:OrderStatus,
    profile?:UserProfileModel | CompanyProfileModel,
    //order_items:Array<OrderItemModel>,
    //store:StoreModel,
    delivery_time?:string | Dayjs|null,
    request_earliest_delivery:boolean,
    delivered_time?:string | Dayjs,
    created_at?:string | Dayjs,
    canceled_at?:string | Dayjs,
    cart:CartModel,
}

export interface OrderItemModel{
    id?:number,
    product_item:ProductModel|number,
    product_quantity:number,
    order?:number
}