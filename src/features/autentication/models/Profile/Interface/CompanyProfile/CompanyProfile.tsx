import { AddressInterface, AddressRequestInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface, AuthSigninRequestInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";
import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";

export interface CompanyProfileInterface{
    id:number,
    image:string,
    first_name:string,
    last_name:string,
    company_name:string,
    date_of_foundation:string ,
    auth:AuthInterface,
    address:AddressInterface,
    entity_address:EntityAddressInterface,
    is_certificated:boolean,
}

export type CompanyProfileSigninRequestInterface = Omit<CompanyProfileInterface,'id'|'image'|'auth'|'address' |'is_certificated'> & {
    image:FileList,
    auth:AuthSigninRequestInterface,
    address:AddressRequestInterface
} 