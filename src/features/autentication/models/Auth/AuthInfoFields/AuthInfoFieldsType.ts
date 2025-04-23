import { z } from "zod";
export const authInfoFieldsSchema = z.object({
    auth:z.object({
        phone_number:z.string().min(1),
        email:z.string().email().min(1),
        password:z.string().min(1),
        conferm_password:z.string().min(1)  
    })
})
export const AuthSchema = z.object({
    auth:z.object({
        phone_number: z
        .string()
        .min(1, { message: 'Phone number is required.' })
        .regex(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number format.' }),
    
        email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    
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
})
export type AuthInfoFieldsType = z.infer<typeof authInfoFieldsSchema>