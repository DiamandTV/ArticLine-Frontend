import { CompanyProfileInfoFieldsType } from "../InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType"
import { CourierProfileInfoFieldsType } from "../InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType"
import { UserProfileInfoFieldsType } from "../InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType"
import { CompanyProfileInterface } from "./CompanyProfile/CompanyProfile"
import { CourierProfileInterface } from "./CourierProfile/CourierProfile"
import { UserProfileInterface } from "./UserProfile/UserProfile"

export type ProfileType = 'USER' | 'COMPANY' | 'COURIER'

export type ProfileInterface = UserProfileInterface | CourierProfileInterface | CompanyProfileInterface | null

export type ProfileInfoFieldsType = UserProfileInfoFieldsType | CourierProfileInfoFieldsType | CompanyProfileInfoFieldsType