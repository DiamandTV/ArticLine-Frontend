import { api } from "@lib/axios/api"
import { UserProfileInterface } from "../models/Profile/Interface/UserProfile/UserProfile";
import { CourierProfileInterface } from "../models/Profile/Interface/CourierProfile/CourierProfile";
import { CompanyProfileInterface } from "../models/Profile/Interface/CompanyProfile/CompanyProfile";
import { ProfileType } from "../models/Profile/Interface/Type";
import { COMPANY_SIGIN_URL, COURIER_SIGNIN_URL, USER_SIGNIN_URL } from "../data/endpoints";

/*
    ? PARAMS:
        - endpoint
        - data
*/
export async function userSigninService(data:UserProfileInterface){
    return await api.post(USER_SIGNIN_URL,data)
}
export async function courierSigninService(data:CourierProfileInterface){
    return await api.post(COURIER_SIGNIN_URL,data)
}
export async function companySigninService(data:CompanyProfileInterface){
    return await api.post(COMPANY_SIGIN_URL,data)
}

interface SigninServiceParams{
    profileType:ProfileType,
    data:UserProfileInterface|CourierProfileInterface|CompanyProfileInterface
}
export async function signinService({profileType,data}:SigninServiceParams){
    switch(profileType){
        case 'USER':
            return await userSigninService(data as UserProfileInterface)
        case 'COURIER':
            return await courierSigninService(data as CourierProfileInterface)
        case 'COMPANY':
            return await companySigninService(data as CompanyProfileInterface)
        
    }
}
