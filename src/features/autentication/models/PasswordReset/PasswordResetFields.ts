import { z } from "zod";

export const passwordResetFieldsSchema = z.object({
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),

    conferm_password: z
    .string()
    .min(1, { message: 'Please confirm your password.' }),
}).refine((data) => data.password === data.conferm_password, {
    path: ['conferm_password'],
    message: 'Passwords do not match.',
})

export type PasswordResetFieldsType = z.infer<typeof passwordResetFieldsSchema>

// Getting the inside ZobObject of ZodEffect
export const basePasswordResetFieldsSchema = passwordResetFieldsSchema._def.schema