import { z } from "zod";

export const userProfileInfoFieldsSchema = z.object({
    image:z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    first_name:z.string().min(1),
    last_name:z.string().min(1),
    username:z.string().min(1),
    date_of_birth:z.string().min(1),
    address:z.string().min(1)
})
export type UserProfileInfoFieldsType = z.infer<typeof userProfileInfoFieldsSchema>