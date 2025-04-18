import { AddressRequestInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { AuthInterface, AuthSigninRequestInterface } from "@features/autentication/models/Auth/AuthInterface/AuthInterface";
import { CompanyProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { CourierProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { UserProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType";
import { CompanyProfileInterface, CompanyProfileSigninRequestInterface } from "@features/autentication/models/Profile/Interface/CompanyProfile/CompanyProfile";
import { CourierProfileInterface, CourierProfileSigninRequestInterface } from "@features/autentication/models/Profile/Interface/CourierProfile/CourierProfile";
import { UserProfileInterface, UserProfileSigninRequestInterface } from "@features/autentication/models/Profile/Interface/UserProfile/UserProfile";
import { CompanySigninFieldsType, CourierSigninFieldsType, UserSigninFieldsType } from "@features/autentication/models/SigninFields/SigninFieldsType";
import { FormTransformers } from "@models/transformers/transformers";

export const userSigninTransformer:FormTransformers<UserSigninFieldsType,UserProfileSigninRequestInterface,UserProfileInterface> = {
    formToRequest:(formData:UserSigninFieldsType):UserProfileSigninRequestInterface=>{
        const {image,email,phone_number,password,conferm_password,...rest} = formData
        const auth:AuthSigninRequestInterface = {
            email,
            phone_number,
            password,
            conferm_password
        }
        return {
            auth,
            image:"",

            ...rest
        }
    },
    apiToForm:(data)=>{

    }
}

export const courierSigninTransformer:FormTransformers<CourierSigninFieldsType,CourierProfileSigninRequestInterface,CourierProfileInterface> = {
    formToApi:(formData)=>{

    },
    apiToForm:(data)=>{

    }
}

export const companySigninTransformer:FormTransformers<CompanySigninFieldsType,CompanyProfileSigninRequestInterface,CompanyProfileInterface> = {
    formToApi:(formData)=>{

    },
    apiToForm:(data)=>{

    }
}