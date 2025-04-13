import { z } from "zod";
import { authInfoFieldsSchema } from "../AuthInfoFields/AuthInfoFieldsType";
import { profileInfoFieldsSchema } from "../ProfileInfoFields/ProfileInfoFieldsType";

export const signinFieldsSchema = z.object({
}).merge(
    profileInfoFieldsSchema
).merge(
    authInfoFieldsSchema
)



export type SigninFieldsType = z.infer<typeof signinFieldsSchema>
