import {AuthModel} from "./auth"
import {AddressModel} from "./address"
import { Dayjs } from "dayjs"
export interface UserProfileModel{
    id:number,
    auth:AuthModel,
    image:string,
    first_name:string,
    last_name:string,
    username:string,
    date_of_birth:string | Dayjs,
    address:AddressModel
}

