import { api } from "./api"
import { CompanyProfileModel } from "../models/company"
import { CompanySigninStepperType } from "../page/CompanySignIn"
//import { CompanyInfoFields } from "../components/forms/CompanyInfoForm"
import { AddressFields } from "../components/Forms/AddressForm"
import { AccountFields } from "../components/Forms/AccountForm"
//import { AuthModel } from "../models/auth"
import dayjs from "dayjs"
export const useCompanyService = {
    async companySignin(companyProfile:CompanyProfileModel){
        console.log(companyProfile)
        return api.post('/company/signin/',companyProfile)
    },
    serializeFromStepperData(record:[CompanyProfileModel, AddressFields, AccountFields]):CompanyProfileModel{
        let object:Partial<CompanyProfileModel> = {};
        console.log("RECORD");
        console.log(record);
        (record as CompanySigninStepperType).forEach((stepForm)=>{
            object = {...object,...stepForm}
        });         
        console.log(object)
        //const address = record[1]
        return {...object,date_of_foundation:dayjs(object.date_of_foundation).format("YYYY-MM-DD")} as CompanyProfileModel
    },
}
