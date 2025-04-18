import { AddressInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";

export interface CourierProfileInterface{
    id:number,
    image:string,
    first_name:string,
    last_name:string,
    username:string,
    date_of_birth:string,
    auth:AuthInterface,
    address:AddressInterface
}