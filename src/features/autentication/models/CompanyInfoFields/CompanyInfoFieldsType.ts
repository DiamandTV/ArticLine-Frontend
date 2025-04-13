import { z } from "zod";

export const companyInfoFieldsSchema = z.object({
    first_name: z.string().min(1).max(150),
    last_name: z.string().min(1).max(150),
    company_name: z.string().min(1).max(150),
    //username: z.string(),
    date_of_foundation:z.string().min(1)
    //date_of_foundation: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date')
})

export type CompanyInfoFieldsType = z.infer<typeof companyInfoFieldsSchema>