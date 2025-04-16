import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { UserSigninFields } from "./UserSignin/UserSigninFields";
import { CourierSigninFields } from "./CourierSignin/CourierSigninFields";
import { CompanySigninFields } from "./CompanySignin/CompanySigninFields";

interface SigninFieldsFactoryProps extends FieldsProps{
    profileType:ProfileType
}
export function SigninFieldsFactory(props:SigninFieldsFactoryProps){
    switch(props.profileType){
        case 'USER':
            return <UserSigninFields {...props}/>
        case 'COURIER':
            return <CourierSigninFields {...props}/>
        case 'COMPANY':
            return <CompanySigninFields {...props}/>
    }
}