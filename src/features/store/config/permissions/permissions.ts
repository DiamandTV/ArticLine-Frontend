import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { AbilityBuilderParams } from "@models/Permission/permission";


export function storePermissions(profile:Exclude<ProfileInterface,null>,{can}:AbilityBuilderParams){
    switch(profile.auth.type){
        case 'USER':
            
            can('read','Store')
            can(['read'],'Store Category')
            can(['read'],'Product')
            break
        case 'COMPANY':
            can('read','Store')
            can('read','Store Category')
            can('read','Product')

            can('create','Store Category Create')
            can('create','Product Create')

            can(['settings','update','delete',],'Store',['company_profile'],{company_profile:profile.id})
            can(['settings','update','delete',],'Store Category',['store.company_profile'],{store:{company_profile:profile.id}})
            can(['settings','update','delete',],'Product',['store_category.store.company_profile'],{store_category:{store:{company_profile:profile.id}}})
            break
        case 'COURIER':
            break
    }
}