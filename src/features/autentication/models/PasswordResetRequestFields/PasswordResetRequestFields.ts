import { z } from "zod";

export const passwordResetRequestFieldsSchema = z.object({
    email:z.string().email()
})

export type PasswordResetRequestFieldsType = z.infer<typeof passwordResetRequestFieldsSchema>