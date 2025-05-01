import { z } from "zod";
import { authInfoFieldsSchema } from "../Auth/AuthInfoFields/AuthInfoFieldsType";
import { userProfileInfoFieldsSchema } from "../Profile/InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType";
import { courierProfileInfoFieldsSchema } from "../Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { companyInfoFieldsSchema } from "../Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";

export const userSigninFieldsSchema = z.object({
}).merge(
    userProfileInfoFieldsSchema
).merge(
    authInfoFieldsSchema
)

export type UserSigninFieldsType = z.infer<typeof userSigninFieldsSchema>

export const courierSigninFieldsSchema = z.object({
}).merge(
    courierProfileInfoFieldsSchema
).merge(
    authInfoFieldsSchema
)

export type CourierSigninFieldsType = z.infer<typeof courierProfileInfoFieldsSchema>

export const companySigninFieldsSchema = z.object({    
}).merge(
    companyInfoFieldsSchema
).merge(
    authInfoFieldsSchema
)

export type CompanySigninFieldsType = z.infer<typeof companySigninFieldsSchema>


