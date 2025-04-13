import { FormOperationInterface } from "@models/forms/FormOperationType";
import {_Create} from './SigninFormCreate'
import { _Update } from "./SigninFormUpdate";
export const SigninForm:FormOperationInterface = {
    Create:()=>{
        return <_Create/>
    },
    Update:()=>{
        return <_Update/>
    }
}