import { CompanyProfileModel } from "../models/company"
import api from "./api"
import { CompanySigninStepperType } from "../page/CompanySignIn"
import { CompanyInfoFields } from "../components/forms/CompanyInfoForm"
import { AddressFields } from "../components/forms/AddressForm"
import { AccountFields } from "../components/forms/AccountForm"
import { AuthModel } from "../models/auth"
export const useCompanyService = {
    async companySignin(companyProfile:CompanyProfileModel){
        
    },
    stepperToProfileData(record:Array<Record<string,unknown>>){
        let object = {};
        (record as CompanySigninStepperType).forEach((stepForm)=>{
            object = {...object,...stepForm}
        });         
        const auth:AuthModel = {
            email:(object as (CompanyInfoFields & AddressFields & AccountFields)).email,
            password:(object as (CompanyInfoFields & AddressFields & AccountFields)).password
        }
        const address = record[1]
        const date_of_foundation = (object as (CompanyInfoFields & AddressFields & AccountFields)).date_of_foundation

        return {
            auth,
            address,
            ...record[0],
            date_of_foundation,
            
        }
    }
}
