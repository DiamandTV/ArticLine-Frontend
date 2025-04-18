import { PasswordResetForm } from "@features/autentication/components/forms/PasswordResetForm/PasswordResetNewForm.tsx/PasswordResetForm";
import { PasswordResetHeaderText } from "@features/autentication/components/texts/PasswordResetText/Headers/PasswordResetHeaderText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function PasswordResetPage(){
    return(
        <AuthenticationView>
            <PasswordResetHeaderText/>
            <PasswordResetForm/>
        </AuthenticationView>
    )
}