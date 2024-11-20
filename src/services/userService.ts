import api from "./api"
import { UserProfileModel } from "../models/user"
import { UserSigninStepperType  } from "../page/UserSignIn"
import { UserInfoFields } from "../components/forms/UserInfoForm"
import { AddressFields } from "../components/forms/AddressForm"
import { AccountFields } from "../components/forms/AccountForm"
import { AuthModel } from "../models/auth"
export const useUserService = 
     {
        async userSignin(userProfile:UserProfileModel){
            
        },
        stepperToProfileData(record:Array<Record<string,unknown>>){
            let object = {};
            (record as UserSigninStepperType).forEach((stepForm)=>{
                object = {...object,...stepForm}
            });         
            const auth:AuthModel = {
                email:(object as (UserInfoFields & AddressFields & AccountFields)).email,
                password:(object as (UserInfoFields & AddressFields & AccountFields)).password
            }
            const address = record[1]
            const data_of_birth = (object as (UserInfoFields & AddressFields & AccountFields)).date_of_birth

            return {
                auth,
                address,
                ...record[0],
                data_of_birth,
                
            }
        }
    }
