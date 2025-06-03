
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { UserProfileInfoFieldsProvider } from "./UserProfileInfoFields/UserProfileInfoFields";
import { CompanyProfileInfoFieldsProvider } from "./CompanyProfileInfoFields/CompanyProfileInfoFields";
import { CourierProfileInfoFieldsProvider } from "./CourierProfileInfoFields/CourierProfileInfoFields";

// interface ProfileInfoFieldsProviderFactory<T extends ProfileType> extends GenericFieldsProviderProps<ProfileFieldMap[T]>{
//     profileType:ProfileType
// }

// export function ProfileInfoFieldsProviderFactory<T extends ProfileType>(props:ProfileInfoFieldsProviderFactory<T>){
//     const ProfileInfoProvider = FieldsProvider<ProfileFieldMap[T]>
//     return (
//         <ProfileInfoProvider {...props}>
//             {props.children}
//         </ProfileInfoProvider>
//     )   
// }

export function getProfileInfoFieldsProviderFactory(props:{profileType:ProfileType}){
    switch(props.profileType){
        case 'USER':
            return UserProfileInfoFieldsProvider
        case 'COURIER':
            return CourierProfileInfoFieldsProvider
        case 'COMPANY':
            return CompanyProfileInfoFieldsProvider
    }
}
