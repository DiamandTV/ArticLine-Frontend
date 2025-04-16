import { SigninFieldsFactory } from "../../fields/Signin/SigninFieldsFactory";
import { SigninFormProps } from "./SigninForm";
export function _Update(props:SigninFormProps){
    return(
        <SigninFieldsFactory {...props}/>
    )
}