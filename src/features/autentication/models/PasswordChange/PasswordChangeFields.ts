import { z } from "zod";
import { basePasswordResetFieldsSchema } from "../PasswordReset/PasswordResetFields";

export const passwordActualFieldSchema = z.object({
    actual_password:z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),
})

export type PasswordActualFieldType = z.infer<typeof passwordActualFieldSchema>

export const passwordChangeFieldsSchema = z.object({
    //...passwordActualFieldSchema.shape,
    actual_password:z.string().min(1),
    ...basePasswordResetFieldsSchema.shape
}).refine((data) => data.password === data.conferm_password, {
    path: ['conferm_password'],
    message: 'Passwords do not match.',
})

export type PasswordChangeFieldsType = z.infer<typeof passwordChangeFieldsSchema>