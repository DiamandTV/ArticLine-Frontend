import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { z } from "zod";

export const orderInfoFieldsSchema = z.object({
    cart:z.coerce.number(),
    request_earliest_delivery:z.coerce.boolean(),
    delivery_time:z.string().datetime(),
    address:addressInfoFieldsSchema,
    extra_details:z.string().min(1)
})

export type OrderInfoFieldsType = z.infer<typeof orderInfoFieldsSchema>