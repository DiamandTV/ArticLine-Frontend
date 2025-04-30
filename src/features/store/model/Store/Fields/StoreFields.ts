import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const storeInfoFieldsSchema = z.object({
    image:singleImageValidator,
    title:z.string().min(1),
    description:z.string(),
    category:z.string(),
    address:addressInfoFieldsSchema
})

export type StoreInfoFieldsType = z.infer<typeof storeInfoFieldsSchema>