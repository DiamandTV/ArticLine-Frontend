import { CompanyProfileInterface } from "@features/autentication/models/Profile/Interface/CompanyProfile/CompanyProfile";
import { CourierProfileInterface } from "@features/autentication/models/Profile/Interface/CourierProfile/CourierProfile";
export type OrderDeliveryBatchStatusType = 
    'PENDING' | 
    'PICKED UP' | 
    'IN PROGRESS' |
    'COMPLETED'

export interface OrderDeliveryBatchInterface{
    id:number
    title:string,
    status:OrderDeliveryBatchStatusType,
    
    pickup_time:string,
    pickedup_time?:string,
    finished_time?:string,
    
    temperature_start_range:number,
    temperature_end_range:number

    orders_count:number,

    company:CompanyProfileInterface,
    courier:CourierProfileInterface,
    device?:unknown,
    
}