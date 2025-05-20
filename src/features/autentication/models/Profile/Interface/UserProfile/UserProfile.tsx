import { AddressRequestInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface, AuthSigninRequestInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";
import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";

export interface UserProfileInterface{
    id:number,
    image:string,
    first_name:string,
    last_name:string,
    username:string,
    date_of_birth:string,
    auth:AuthInterface,
    address:AddressRequestInterface,
    entity_address:EntityAddressInterface,
}

export type UserProfileSigninRequestInterface = Omit<UserProfileInterface,'id'|'image'|'auth'|'address'> & {
    image:FileList,
    auth:AuthSigninRequestInterface,
    address:AddressRequestInterface
} 