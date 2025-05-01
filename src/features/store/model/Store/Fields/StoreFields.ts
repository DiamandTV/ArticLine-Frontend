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
    categories:z.array(categorySelectInfoFieldsSchema).
    transform((categoriesSelect):number[]=>categoriesSelect.map((category)=>category.value)),
    address:addressInfoFieldsSchema
})

export type StoreInfoFieldsType = z.infer<typeof storeInfoFieldsSchema>