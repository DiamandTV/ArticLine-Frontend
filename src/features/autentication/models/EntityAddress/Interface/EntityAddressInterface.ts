import { AddressInterface } from "../../Address/Interface/AddressInterface";

export interface EntityAddressInterface{
    id:number,
    address:AddressInterface,
    phone_number:string,
    extra_info:string,
    denomination:string,
    is_default:boolean
}