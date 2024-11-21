import {AuthModel} from "./auth"
import {AddressModel} from "./address"
export interface UserProfileModel{
    auth:AuthModel,
    image:string,
    first_name:string,
    last_name:string,
    username:string,
    date_of_birth:string,
    address:AddressModel
}