import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
//import { AbilityBuilderParams } from "@models/Permission/permission";

export function authenticationPermissions(profile:Exclude<ProfileInterface,null>){
    switch(profile.auth.type){
        case 'USER':
            break
        case 'COMPANY':
            break
        case 'COURIER':
            break
    } 
}