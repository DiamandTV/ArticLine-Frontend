// ArticLine Company model
import {AuthModel} from "./auth"
import { AddressModel } from "./address"
import { Dayjs } from "dayjs"
export interface CompanyProfileModel{
    id?:number,
    auth:AuthModel,
    image:string,
    first_name:string,
    last_name:string,
    company_name:string,
    date_of_foundation:string | Dayjs,
    address:AddressModel,
    is_certificated:boolean | undefined,
}