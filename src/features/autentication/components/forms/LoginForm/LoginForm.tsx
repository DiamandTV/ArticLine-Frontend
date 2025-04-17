import { Button } from "react-bootstrap";
import { LoginFields, LoginFieldsProvider } from "../../fields/Login/LoginFields";
import { LoginPasswordForgotText } from "../../texts/LoginText/LoginBottomText/LoginPasswordForgotText";
export function LoginForm(){
    return(
        <div className="flex flex-col gap-2 w-full">
            <LoginFieldsProvider>
                <LoginFields/>          
                <LoginFormButton/>
                <LoginPasswordForgotText/>  
            </LoginFieldsProvider>
        </div>
    )
}

function LoginFormButton(){
    // const {} = useMutation({

    // })
    return(
        <Button>LOGIN</Button>
    )
}

 