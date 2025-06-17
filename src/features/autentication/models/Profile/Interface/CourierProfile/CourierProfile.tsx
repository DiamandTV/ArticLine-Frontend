import { AddressInterface, AddressRequestInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface, AuthSigninRequestInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";
import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";

export interface CourierProfileInterface{
    id:number,
    image:string,
    first_name:string,
    last_name:string,
    username:string,
    date_of_birth:string,
    auth:AuthInterface,
    address:AddressInterface,
    entity_address:EntityAddressInterface,
}

export type CourierProfileSigninRequestInterface = Omit<CourierProfileInterface,'id'|'image'|'auth'|'address'|'entity_address'> & {
    image:File,
    auth:AuthSigninRequestInterface,
    address:AddressRequestInterface
} 