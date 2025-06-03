import { CourierProfileInterface } from "@features/autentication/models/Profile/Interface/CourierProfile/CourierProfile";
import { DeviceInterface } from "@features/device/model/Device/Interface/DeviceInterface";
import { Moment } from "moment";
import { z } from "zod";


export const orderDeliveryBatchFieldsSchema = z.object({
    title:z.string().min(2),
    device:z.custom<DeviceInterface>(),
    courier:z.custom<CourierProfileInterface>(),
    // add_orders:ordersMultiSelectFieldsSchema,
    // remove_orders:ordersMultiSelectFieldsSchema,
    // orders:ordersMultiSelectFieldsSchema,

    pickup_time:z.custom<Moment>((val)=> val,'Required').refine((data:Moment)=>data.toISOString(),'Wrong format'),
})

export type OrderDeliveryBatchFieldsType = z.infer<typeof orderDeliveryBatchFieldsSchema>