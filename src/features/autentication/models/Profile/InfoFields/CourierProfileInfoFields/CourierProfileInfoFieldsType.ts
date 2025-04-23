import { addressInfoFieldsSchema } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { adultValidator } from "@features/autentication/utils/validation/adult/adult";
import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const courierProfileInfoFieldsSchema = z.object({
    image:singleImageValidator,
    first_name: z.string().min(5).max(150),
    last_name: z.string().min(5).max(150),
    username:z.string().min(1).max(150),
    date_of_birth:adultValidator,
    // address:z.string().min(1)
    address:addressInfoFieldsSchema
})
export type CourierProfileInfoFieldsType = z.infer<typeof courierProfileInfoFieldsSchema>