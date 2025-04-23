import { api } from "@lib/axios/api"
import { UserProfileSigninRequestInterface } from "../models/Profile/Interface/UserProfile/UserProfile";
import { CourierProfileInterface } from "../models/Profile/Interface/CourierProfile/CourierProfile";
import { CompanyProfileInterface } from "../models/Profile/Interface/CompanyProfile/CompanyProfile";

import { COMPANY_SIGIN_URL, COURIER_SIGNIN_URL, USER_SIGNIN_URL } from "../data/endpoints";
import { objToFormData } from "@utils/objToFormData/objToFormData";

/*
    ? PARAMS:
        - endpoint
        - data
*/
export async function userSigninService(data:UserProfileSigninRequestInterface){
    console.log(data)
    const formDatas = new FormData()
    const formData = objToFormData(formDatas,{...data,image:data.image[0]},"")
    console.log(Array.from(formData))
    //const _data:Omit<UserProfileSigninRequestInterface,'image'> = {...data}
    //formData.append('data',JSON.stringify(_data))
    return await api.post(USER_SIGNIN_URL,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
export async function courierSigninService(data:CourierProfileInterface){
    return (await api.post(COURIER_SIGNIN_URL,data)).data
}
export async function companySigninService(data:CompanyProfileInterface){
    return (await api.post(COMPANY_SIGIN_URL,data)).data
}

// interface SigninServiceParams{
//     profileType:ProfileType,
//     data:UserProfileInterface|CourierProfileInterface|CompanyProfileInterface
// }
// export async function signinService({profileType,data}:SigninServiceParams){
//     switch(profileType){
//         case 'USER':
//             return await userSigninService(data as UserProfileInterface)
//         case 'COURIER':
//             return await courierSigninService(data as CourierProfileInterface)
//         case 'COMPANY':
//             return await companySigninService(data as CompanyProfileInterface)
        
//     }
// }
