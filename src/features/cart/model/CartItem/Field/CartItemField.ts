import { z } from "zod";

export const cartItemInfoFieldsSchema = z.object({
    product_item:z.coerce.number(),
    product_quantity:z.coerce.number()
})

export type CartItemInfoFieldsType = z.infer<typeof cartItemInfoFieldsSchema>