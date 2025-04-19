import { z } from "zod";
export const authInfoFieldsSchema = z.object({
    auth:z.object({
        phone_number:z.string().min(1),
        email:z.string().email().min(1),
        password:z.string().min(1),
        conferm_password:z.string().min(1)  
    })
})

export type AuthInfoFieldsType = z.infer<typeof authInfoFieldsSchema>