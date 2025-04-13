import { z } from "zod";

export const loginFieldsSchema = z.object({
    email:z.string().email(),
    password:z.string().min(1)
})

export type LoginFieldsType = z.infer<typeof loginFieldsSchema>