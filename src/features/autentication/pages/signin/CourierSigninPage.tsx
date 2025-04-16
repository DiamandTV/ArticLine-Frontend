import { SigninForm } from "@features/autentication/components/forms/SigninForms/SigninForm";
import { SigninText } from "@features/autentication/components/texts/SigninText/SigninText";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

const profileType:ProfileType = 'COURIER'

export function CourierSigninPage(){
    return(
        <AuthenticationView>
            <SigninText profileType={profileType}/>
            <SigninForm.Create profileType={profileType}/>
        </AuthenticationView>
    )
}