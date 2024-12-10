import { UserProfileModel } from "../../models/user";
import { CompanyProfileModel } from "../../models/company";
import { AbilityBuilder, createMongoAbility } from '@casl/ability'

const USER      =   "USER"
const COMPANY   =   "COMPANY"

export default function defineAbilityFor(profile:UserProfileModel | CompanyProfileModel){
    const { can,cannot,build } = new AbilityBuilder(createMongoAbility)
    console.log(profile)
    
    if(profile.auth.type === USER){
        // a normal user can only see the stores
        
        can('read','STORE')
        cannot('create','STORE')
        cannot('update','STORE')
        cannot('delete','STORE')       
        
        can('read','PRODUCT')
        cannot('create','PRODUCT')
        cannot('update','PRODUCT')
        cannot('delete','PRODUCT')   
    } else if(profile.auth.type === COMPANY){
        // the user can see the stores but they can also create a personal
        can('read','STORE')
        can('create','STORE')
        can('update','STORE',{id:profile.id})
        can('delete','STORE',{id:profile.id})

        can('read','STORE')
        can('create','PRODUCT',{company_profile:profile.id})
        can('update','PRODUCT',{company_profile:profile.id})
        can('delete','PRODUCT',{company_profile:profile.id})
    } else {
        // none 
    }
    return build()
}

