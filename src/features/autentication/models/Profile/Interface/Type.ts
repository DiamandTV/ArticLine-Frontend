import { CompanyProfileInterface } from "./CompanyProfile/CompanyProfile"
import { CourierProfileInterface } from "./CourierProfile/CourierProfile"
import { UserProfileInterface } from "./UserProfile/UserProfile"

export type ProfileType = 'USER' | 'COMPANY' | 'COURIER'

export type ProfileInterface = UserProfileInterface | CourierProfileInterface | CompanyProfileInterface | null