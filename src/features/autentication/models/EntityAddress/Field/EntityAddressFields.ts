import { z } from "zod";
import { addressInfoFieldsSchema } from "../../Address/AddressInfoFields/AddressInfoFieldsType";

export const entityAddressInfoFieldsSchema = z.object({
    address:addressInfoFieldsSchema,
    phone_number:z.string().min(1),
    extra_info:z.string().min(1),
    denomination:z.string().min(1)
})

export type EntityAddressInfoFieldsType = z.infer<typeof entityAddressInfoFieldsSchema>