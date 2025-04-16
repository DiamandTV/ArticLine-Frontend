import { LoginForm } from "@features/autentication/components/forms/LoginForm/LoginForm";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";

export function LoginPage(){
    return(
        <AuthenticationView>
            <LoginForm/>
        </AuthenticationView>
    )
}
