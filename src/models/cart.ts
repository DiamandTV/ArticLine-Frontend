import { OrderItemModel } from "./Order";
import { StoreModel } from "./store";

export interface CartModel{
    id?:number|string,
    profile?:number,
    store?:number,
    store_name?:string,
    order_items:Array<OrderItemModel>
}