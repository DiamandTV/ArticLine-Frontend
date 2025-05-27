import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";
import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";
import { OrderDeliveryBatchInterface } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface";

export type OrderStatusType =
    'NOT ACCEPTED'  |
    'ACCEPTED'      |
    'WORKING ON'    |
    'READY'         |
    'SENDED'        |
    'DELIVERED'     |
    'CANCELED'      |
    'REFUSED'

export const COMPANY_ORDER_STATUS_STEPS:Array<OrderStatusType> = ['NOT ACCEPTED','ACCEPTED','WORKING ON','READY']
export const ACTIVE_ORDER_STATUS_STEPS:Array<OrderStatusType> = ['NOT ACCEPTED','ACCEPTED','WORKING ON','READY','SENDED','DELIVERED']
export interface OrderInterface{
    id:number,
    //order:number,
    status:OrderStatusType,

    request_earliest_delivery:boolean,
    delivery_time?:string,
    delay_time?:string,
    
    pickedup_time?:string,
    delivered_time?:string,
    
    cart:CartInterface,
    entity_address:EntityAddressInterface,

    canceled_at?:string,
    created_at:string,
    updated_at:string,
}

export interface OrderBusinessInterface extends OrderInterface{
    order_delivey_batch?:OrderDeliveryBatchInterface
}