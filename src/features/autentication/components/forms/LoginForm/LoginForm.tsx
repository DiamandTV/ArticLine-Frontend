import { Button } from "react-bootstrap";
import { LoginFields, LoginFieldsProvider } from "../../fields/Login/LoginFields";
export function LoginForm(){
    return(
        <div className="flex flex-col gap-2 w-full">
            <LoginFieldsProvider>
                <LoginFields/>          
                <LoginFormButton/>
                <LoginFormLostPassword/>  
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

function LoginFormLostPassword(){
    return(
        <div className="w-full flex flex-row items-center justify-end gap-1 text-sm">
            <span>Lost password?</span>
            <b className="italic">CLICK HERE!</b>
        </div>
    )
}