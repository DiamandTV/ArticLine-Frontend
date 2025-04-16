import { Button } from "react-bootstrap";
import { LoginFields, LoginFieldsProvider } from "../../fields/Login/LoginFields";
export function LoginForm(){
    return(
        <div className="flex flex-col gap-2 w-full">
            <LoginFieldsProvider>
                <LoginFields/>          
                <LoginFormButton/>  
            </LoginFieldsProvider>
        </div>
    )
}

export function LoginFormButton(){
    return(
        <Button>LOGIN</Button>
    )
}
