import { ProfileType } from "../../Profile/Interface/Type";

export interface AuthInterface{
    id:number,
    email:string,
    phone_number:string,
    is_verified:boolean,
    is_superuser:boolean,
    type:ProfileType
}

export type AuthSigninRequestInterface = {
    email:string,
    phone_number:string,
    password:string,
    conferm_password:string
}