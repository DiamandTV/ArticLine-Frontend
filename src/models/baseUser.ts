import {AddressModel} from "./address"
export interface BaseUserModel {
    //image:any,
    username:string,
    first_name:string,
    last_name:string,
    email:string,
    date:string,
    password:string
    address:AddressModel
}