import {Create} from './SigninFormCreate'
import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";

export interface SigninFormProps{
    profileType:ProfileType,
}

export const SigninForm = {
    Create:(props:SigninFormProps)=>{
        return <Create {...props}/>
    }
}