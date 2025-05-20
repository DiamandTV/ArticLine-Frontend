import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";
import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";

type OrderStatusType =
    'NOT ACCEPTED'  |
    'ACCEPTED'      |
    'WORKING ON'    |
    'READY'         |
    'SENDED'        |
    'DELIVERED'     |
    'CANCELED'      

export interface OrderInterface{
    id:number,
    //order:number,
    status:OrderStatusType,

    request_earliest_delivery:boolean,
    delivery_time:string,
    delay_time:string,
    
    pickedup_time:string,
    delivered_time:string,
    
    cart:CartInterface,
    entity_address:EntityAddressInterface,

    canceled_at:string,
    created_at:string,
    updated_at:string,
}