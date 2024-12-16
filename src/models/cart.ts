import { OrderItemModel } from "./Order";
import { StoreModel } from "./store";

export interface CartModel{
    id?:number|string,
    profile:number,
    store:StoreModel
    order_items:Array<OrderItemModel>
}