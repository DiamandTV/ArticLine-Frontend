import { z } from "zod";

export const companyInfoFieldsSchema = z.object({
    image:z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    first_name: z.string().min(1).max(150),
    last_name: z.string().min(1).max(150),
    company_name: z.string().min(1).max(150),
    //username: z.string(),
    date_of_foundation:z.string().min(1),
    //date_of_foundation: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date')
    address:z.string().min(1)
})

export type CompanyProfileInfoFieldsType = z.infer<typeof companyInfoFieldsSchema>