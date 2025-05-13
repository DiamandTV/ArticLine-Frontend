import { AddressInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
//import { CompanyProfileInterface } from "@features/autentication/models/Profile/Interface/CompanyProfile/CompanyProfile";

export interface StoreInterface{
    id:number,
    image:string,
    title:string,
    description:string,
    
    categories:Array<number>,
    //store_categories:Array<number>,

    //company_profile:CompanyProfileInterface,
    company_profile:number,
    address:AddressInterface,
    is_certificated:boolean,
    
}