import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { GenericFieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { ProfileFieldMap } from "@features/autentication/models/Profile/InfoFields/ProfileInfoFields/ProfileInfoFieldsType";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";

interface ProfileInfoFieldsProviderFactory<T extends ProfileType> extends GenericFieldsProviderProps<ProfileFieldMap[T]>{
    profileType:ProfileType
}

export function ProfileInfoFieldsProviderFactory<T extends ProfileType>(props:ProfileInfoFieldsProviderFactory<T>){
    const ProfileInfoProvider = FieldsProvider<ProfileFieldMap[T]>
    return (
        <ProfileInfoProvider {...props}>
            {props.children}
        </ProfileInfoProvider>
    )   
}