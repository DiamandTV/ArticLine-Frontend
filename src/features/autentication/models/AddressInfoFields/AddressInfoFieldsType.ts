import { z } from "zod";

export const addressInfoFieldsSchema = z.object({
    recipient_name: z.string().min(1).max(255),
    street: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    postal_code: z.string(),
    province: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
})

export type AddressInfoFieldsType = z.infer<typeof addressInfoFieldsSchema>