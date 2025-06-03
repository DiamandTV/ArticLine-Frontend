import { z } from "zod";
import { passwordResetFieldsSchema } from "../PasswordReset/PasswordResetFields";

export const passwordActualFieldSchema = z.object({
    actual_password:z.string().min(1)
})

export type PasswordActualFieldType = z.infer<typeof passwordActualFieldSchema>

export const passwordChangeFieldsSchema = passwordResetFieldsSchema
export type PasswordChangeFieldsType = z.infer<typeof passwordChangeFieldsSchema>