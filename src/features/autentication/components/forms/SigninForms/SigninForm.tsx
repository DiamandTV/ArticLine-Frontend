import { FormOperationInterface } from "@models/forms/FormOperationType";
import {_Create} from './SigninFormCreate'
import { _Update } from "./SigninFormUpdate";
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
export interface SigninFormProps{
    profileType:ProfileType,
}

export const SigninForm:FormOperationInterface<SigninFormProps> = {
    Create:(props:SigninFormProps)=>{
        return <_Create {...props}/>
    },
    Update:(props:SigninFormProps)=>{
        return <_Update {...props}/>
    }
}