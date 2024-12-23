import { OrderItemModel } from "./Order";

export interface CartModel{
    id?:number|string,
    profile?:number,
    store?:number,
    company_profile_name?:string,
    store_name?:string,
    order_items:Array<OrderItemModel>
    is_checkout:boolean
}