// export const profileInfoFieldsSchema = z.object({
//     image:z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
//     first_name:z.string().min(1),
//     last_name:z.string().min(1),
//     username:z.string().min(1),
//     birth_of_date:z.string().min(1),
//     address:z.string().min(1)
// })

//import { ProfileType } from "../../Interface/Type";
import { CompanyProfileInterface } from "../../Interface/CompanyProfile/CompanyProfile";
import { CourierProfileInterface } from "../../Interface/CourierProfile/CourierProfile";
import { UserProfileInterface } from "../../Interface/UserProfile/UserProfile";
import { CompanyProfileInfoFieldsType } from "../CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { CourierProfileInfoFieldsType } from "../CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { UserProfileInfoFieldsType } from "../UserProfileInfoFields/UserProfileInfoFieldsType";

// export type ProfileInfoFieldsType = z.infer<typeof profileInfoFieldsSchema>
 
export type ProfileFieldMap = {
    USER: UserProfileInfoFieldsType;
    COURIER: CourierProfileInfoFieldsType;
    COMPANY: CompanyProfileInfoFieldsType;
};

export type ProfileTypeMap = {
  USER:UserProfileInterface,
  COURIER:CourierProfileInterface,
  COMPANY:CompanyProfileInterface
}