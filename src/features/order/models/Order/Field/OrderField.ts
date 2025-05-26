
import { formatDuration } from "@utils/formatDate/formatDuration";
import { Moment } from "moment";
import { z } from "zod";

export const orderInfoFieldsSchema = z.object({
    cart:z.coerce.number(),
    request_earliest_delivery:z.coerce.boolean(),
    delivery_time:z.custom<Moment>((val)=> val,'Required').refine((data:Moment)=>data.toISOString(),'Wrong format'),
    entity_address:z.coerce.number(),
    extra_details:z.string().min(1)
}).refine((data)=>{
    console.log(data.request_earliest_delivery)
    if(!data.request_earliest_delivery && !data.delivery_time){
        return false
    }
    return true
},{
    path:['delivery_time'],
    message:'A delivery datetime is required'
})

export type OrderInfoFieldsType = z.infer<typeof orderInfoFieldsSchema>

export const orderDeliveryTimeFieldsSchema = z.object({
    delivery_time:z.custom<Moment>((val)=> val,'Required').refine((data:Moment)=>data.toISOString(),'Wrong format'),
})

export type OrderDeliveryTimeFieldsType = z.infer<typeof orderDeliveryTimeFieldsSchema>

export const orderDelayTimeFieldsSchema = z.object({
    delay_time:z.custom<{hours:number,minutes:number,seconds:number}>((val)=>val,'Required').transform((data:{hours:number,minutes:number,seconds:number})=>formatDuration(data))
})

export type OrderDelayTimeFieldsType = z.infer<typeof orderDelayTimeFieldsSchema>