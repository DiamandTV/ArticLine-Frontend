import { SigninForm } from "@features/autentication/components/forms/SigninForms/SigninForm";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function CourierSigninPage(){
    return(
        <AuthenticationView>
            <SigninForm.Create profileType="COURIER"/>
        </AuthenticationView>
    )
}