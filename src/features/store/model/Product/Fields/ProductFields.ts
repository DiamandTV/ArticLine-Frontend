import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const productInfoFieldsSchema = z.object({
    image:singleImageValidator,
    name:z.string().min(1),
    description:z.string().min(1),
    price:z.coerce.number().min(0.01),
    temperature_start_range:z.coerce.number().min(0.01),
    temperature_end_range:z.coerce.number().min(0.01)
})

export type ProductInfoFieldsType = z.infer<typeof productInfoFieldsSchema>