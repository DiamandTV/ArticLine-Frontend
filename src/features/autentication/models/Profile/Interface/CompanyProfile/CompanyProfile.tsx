import { AddressInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";

export interface CompanyProfileInterface{
    id:number,
    image:string,
    first_name:string,
    last_name:string,
    company_name:string,
    date_of_foundation:string ,
    auth:AuthInterface,
    address:AddressInterface,
    is_certificated:boolean,
}

export type CompanyProfileSigninRequestInterface = Omit<CompanyProfileInterface,'id'>

