import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { authenticationPermissions } from "@features/autentication/config/permissions/permissions";
import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { storePermissions } from "@features/store/config/permissions/permissions";
import { AppAbility } from "@models/Permission/permission";

export function defineAbilityFor(profile:Exclude<ProfileInterface,null>):AppAbility{
    const {can,cannot,build} = new AbilityBuilder<AppAbility>(createMongoAbility)
   
    authenticationPermissions(profile,{can,cannot})
    storePermissions(profile,{can,cannot})
    
    return build()
}






