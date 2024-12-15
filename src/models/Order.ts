import { Dayjs } from "dayjs"
import { CompanyProfileModel } from "./company"
import { ProductModel } from "./Product"
import { UserProfileModel } from "./user"
//import { StoreModel } from "./store"
export type CartModel = Record<number|string,OrderItemModel> 
export type StoreToCartModel = Record<number|string,CartModel>

export type OrderStatus = 'NOT_ACCEPTED'|'ACCEPTED'|'WORKING_ON'|'SENDED'|'DELIVERED'
export interface OrderModel{
    id?:number,
    total_price:number,
    status:OrderStatus,
    profile?:UserProfileModel | CompanyProfileModel,
    order_items:Array<OrderItemModel>,
    //store:StoreModel,
    delivery_time:string | Dayjs,
    created_at:string | Dayjs
}

export interface OrderItemModel{
    id?:number,
    product_item:ProductModel,
    product_quantity:number,
    order?:number
}