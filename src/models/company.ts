// ArticLine Company model
import {AuthModel} from "./auth"

export interface CompanyProfileModel{
    auth:AuthModel,
    image:string,
    first_name:string,
    last_name:string,
    company_name:string,
    date_of_foundation:string,
    phone_number:string,
    address:string,
    is_certificated:boolean,
}