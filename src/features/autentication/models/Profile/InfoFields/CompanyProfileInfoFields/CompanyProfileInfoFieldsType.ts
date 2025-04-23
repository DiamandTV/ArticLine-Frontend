import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const companyInfoFieldsSchema = z.object({
    image:singleImageValidator,
    first_name: z.string().min(5).max(150),
    last_name: z.string().min(5).max(150),
    company_name: z.string().min(1).max(150),
    date_of_foundation: z.string().min(1),
    //username: z.string(),
    //date_of_foundation: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date')
    //address:z.string().min(1)
    address:addressInfoFieldsSchema
})

export type CompanyProfileInfoFieldsType = z.infer<typeof companyInfoFieldsSchema>