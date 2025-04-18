import { PasswordResetErrorText } from "@features/autentication/components/texts/PasswordResetText/Body/PasswordResetErrorText";
import { PasswordResetErrorHeaderText } from "@features/autentication/components/texts/PasswordResetText/Headers/PasswordResetErrorHeaderText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function PasswordResetErrorPage(){
    return(
        <AuthenticationView>
            <PasswordResetErrorHeaderText/>
            <PasswordResetErrorText/>
        </AuthenticationView>
    )
}