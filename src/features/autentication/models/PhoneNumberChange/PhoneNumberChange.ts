import { z } from "zod";

export const phoneNumberActualFieldsSchema = z.object({
    actual_phone_number:z
        .string()
        .min(1, { message: 'Phone number is required.' })
        .regex(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number format.' }),
})

export type PhoneNumberActualFieldsType = z.infer<typeof phoneNumberActualFieldsSchema>