import { SigninForm } from "@features/autentication/components/forms/SigninForms/SigninForm";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function CompanySigninPage(){
    return(
        <AuthenticationView>
            <SigninForm.Create profileType="COMPANY"/>
        </AuthenticationView>
    )
}