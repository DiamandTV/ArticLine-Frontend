import { Dayjs } from "dayjs"
import { CompanyProfileModel } from "./company"
import { ProductModel } from "./Product"
import { UserProfileModel } from "./user"

export type OrderStatus = 'NOT_ACCEPTED'|'ACCEPTED'|'WORKING_ON'|'SENDED'|'DELIVERED'
export interface OrderModel{
    total_price:number,
    status:OrderStatus,
    profile:UserProfileModel | CompanyProfileModel,
    delivery_time:string | Dayjs,
    created_at:string | Dayjs
}

export interface OrderItemModel{
    product_item:ProductModel,
    product_quantity:number,
    order:number
}