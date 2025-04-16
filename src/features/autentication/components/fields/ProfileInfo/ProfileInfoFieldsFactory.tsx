import { UserProfileInfoFields } from "./UserProfileInfoFields/UserProfileInfoFields";
import { CourierProfileInfoFields } from "./CourierProfileInfoFields/CourierProfileInfoFields";
import { CompanyProfileInfoFields } from "./CompanyProfileInfoFields/CompanyProfileInfoFields";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";

interface ProfileInfoFieldsFactoryProps{
    profileType:ProfileType
}
export function ProfileInfoFieldsFactory({profileType}:ProfileInfoFieldsFactoryProps){
    switch(profileType){
        case 'USER':
            return <UserProfileInfoFields/>
        case 'COURIER':
            return <CourierProfileInfoFields/>
        case 'COMPANY':
            return <CompanyProfileInfoFields/>
    }
}

