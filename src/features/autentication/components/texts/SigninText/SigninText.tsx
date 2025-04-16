import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { UserSigninText } from "./UserSigninText/UserSigninText";
import { CourierSigninText } from "./CourierSigninText/CourierSigninText";
import { CompanySigninText } from "./CompanySigninText/CompanySigninText";

interface SigninTextFactoryProps{
    profileType:ProfileType
}
export function SigninTextFactory(props:SigninTextFactoryProps){
    switch(props.profileType){
        case 'USER':
            return <UserSigninText/>
        case 'COURIER':
            return <CourierSigninText/>
        case 'COMPANY':
            return  <CompanySigninText/>
    }
}

export const SigninText = SigninTextFactory