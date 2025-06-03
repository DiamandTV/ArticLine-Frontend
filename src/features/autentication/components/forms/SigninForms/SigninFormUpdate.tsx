import { SigninFieldsFactory } from "../../fields/Signin/SigninFieldsFactory";
import { SigninFormProps } from "./SigninForm";
export function Update(props:SigninFormProps){
    return(
        <SigninFieldsFactory {...props}/>
    )
}