
import { z } from "zod";

export const orderInfoFieldsSchema = z.object({
    cart:z.coerce.number(),
    request_earliest_delivery:z.coerce.boolean(),
    delivery_time:z.string().datetime({message:"A delivery datetime is required "}).optional(),
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