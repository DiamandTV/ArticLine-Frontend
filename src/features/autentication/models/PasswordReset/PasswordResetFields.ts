import { z } from "zod";

export const passwordResetFieldsSchema = z.object({
    new_password:z.string().min(1),
    conferm_password:z.string().min(1)
})

export type PasswordResetFieldsType = z.infer<typeof passwordResetFieldsSchema>