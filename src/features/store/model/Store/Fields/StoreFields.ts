import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const categorySelectInfoFieldsSchema = z.object({
    value:z.number(),
    label:z.string()
})

export const storeInfoFieldsSchema = z.object({
    image:singleImageValidator,
    title:z.string().min(1),
    description:z.string().min(1),
    categories:z.array(categorySelectInfoFieldsSchema),
    address:addressInfoFieldsSchema
})

export const storeInfoFieldsTransformedSchema = storeInfoFieldsSchema.transform((storeInfo)=>{
    return {
        ...storeInfo,
        categories:storeInfo.categories.map((category)=>category.value)
    }
})

export type StoreInfoFieldsType = z.infer<typeof storeInfoFieldsSchema>
export type StoreInfoFieldsTransformedType = z.infer<typeof storeInfoFieldsTransformedSchema>