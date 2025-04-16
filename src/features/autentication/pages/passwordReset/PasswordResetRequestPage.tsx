import { PasswordResetRequestForm } from "@features/autentication/components/forms/PasswordResetRequestForm/PasswordResetRequestForm";
import { PasswordResetRequestHeaderText } from "@features/autentication/components/texts/PasswordResetText/Headers/PasswordResetRequestHeaderText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function PasswordResetRequestPage(){
    return(
        <AuthenticationView>
            <PasswordResetRequestHeaderText/>
            <PasswordResetRequestForm/>
        </AuthenticationView>
    )
}