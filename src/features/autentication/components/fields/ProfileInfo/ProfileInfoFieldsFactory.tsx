import { UserProfileInfoFields } from "./UserProfileInfoFields/UserProfileInfoFields";
import { CourierProfileInfoFields } from "./CourierProfileInfoFields/CourierProfileInfoFields";
import { CompanyProfileInfoFields } from "./CompanyProfileInfoFields/CompanyProfileInfoFields";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";

interface ProfileInfoFieldsFactoryProps{
    profileType:ProfileType
}
export function ProfileInfoFieldsFactory({profileType,...props}:ProfileInfoFieldsFactoryProps&FieldsProps){
    switch(profileType){
        case 'USER':
            return <UserProfileInfoFields {...props}/>
        case 'COURIER':
            return <CourierProfileInfoFields {...props}/>
        case 'COMPANY':
            return <CompanyProfileInfoFields {...props}/>
    }
}

