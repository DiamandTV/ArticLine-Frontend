import { z } from "zod";

export const profileInfoFieldsSchema = z.object({
    image:z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    first_name:z.string().min(1),
    last_name:z.string().min(1),
    username:z.string().min(1),
    birth_of_date:z.string().min(1),
    address:z.string().min(1)
})

export type ProfileInfoFieldsType = z.infer<typeof profileInfoFieldsSchema>