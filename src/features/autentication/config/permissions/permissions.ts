import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { AbilityBuilderParams } from "@models/Permission/permission";
//import { AbilityBuilderParams } from "@models/Permission/permission";

export function authenticationPermissions(profile:Exclude<ProfileInterface,null>,{can,cannot}:AbilityBuilderParams){
    switch(profile.auth.type){
        case 'USER':
            cannot('read','Business')
            break
        case 'COMPANY':
            can('read','Business')
            break
        case 'COURIER':
            cannot('read','Business')
            break
    } 
}