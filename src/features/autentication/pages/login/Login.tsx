import { LoginForm } from "@features/autentication/components/forms/LoginForm/LoginForm";
import { LoginHeaderText } from "@features/autentication/components/texts/LoginText/LoginHeaderText/LoginHeaderText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function LoginPage(){
    return(
        <AuthenticationView>
            <LoginHeaderText/>
            <LoginForm/>
        </AuthenticationView>
    )
}
