import { singleImageValidator } from "@features/autentication/utils/validation/image/image";
import { z } from "zod";

export const storeCategoryInfoFieldsSchema = z.object({
    image:singleImageValidator,
    name:z.string().min(1),
    description:z.string().min(1)
})

export type StoreCategoryInfoFieldsType = z.infer<typeof storeCategoryInfoFieldsSchema>