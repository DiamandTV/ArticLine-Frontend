import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { adultValidator } from "@features/autentication/utils/validation/adult/adult";
import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const userProfileInfoFieldsSchema = z.object({
    image:singleImageValidator,
    first_name: z.string().min(5).max(150),
    last_name: z.string().min(5).max(150),
    username:z.string().min(1).max(150),
    date_of_birth:adultValidator,
    address:addressInfoFieldsSchema
})
export type UserProfileInfoFieldsType = z.infer<typeof userProfileInfoFieldsSchema>