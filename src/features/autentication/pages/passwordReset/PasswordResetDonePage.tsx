import { PasswordResetDoneText } from "@features/autentication/components/texts/PasswordResetText/Body/PasswordResetDoneText";
import { PasswordResetDoneHeaderText } from "@features/autentication/components/texts/PasswordResetText/Headers/PasswordResetDoneHeaderText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function PasswordResetDonePage(){
    return(
        <AuthenticationView>
            <PasswordResetDoneHeaderText/>
            <PasswordResetDoneText/>
        </AuthenticationView>
    )
}