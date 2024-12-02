import { AddressModel } from "./address"
export interface StoreModel{
    id?:number,
    images:Array<string>,
    company_profile?:number,
    title:string,
    description:string,
    average_rating:number,
    ratings:number,
    views:number,
    address?:AddressModel,
    is_certificated?:boolean
}