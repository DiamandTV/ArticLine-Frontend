import { Moment } from "moment";
import { z } from "zod";

export const orderDeliveryBatchFieldsSchema = z.object({
    title:z.string().min(1),
    device:z.custom(),
    courier:z.custom(),
    pickup_time:z.custom<Moment>((val)=> val,'Required').refine((data:Moment)=>data.toISOString(),'Wrong format'),
})

export type OrderDeliveryBatchFieldsType = z.infer<typeof orderDeliveryBatchFieldsSchema>