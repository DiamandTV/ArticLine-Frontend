import api from "./api"
import { UserProfileModel } from "../models/user"
import { UserSigninStepperType  } from "../page/UserSignIn"
import { UserInfoFields } from "../components/forms/UserInfoForm"
import { AddressFields } from "../components/forms/AddressForm"
import { AccountFields } from "../components/forms/AccountForm"
import { AuthModel } from "../models/auth"
import dayjs from "dayjs"
export const useUserService = 
     {
        async userSignin(userProfile:UserProfileModel){
            let data,error;
            try{
                data = api.post('/user/signin',userProfile)
            } catch(e){
                error = e
            }
            return {data,error}
        },
        stepperToProfileData(record:[UserInfoFields, AddressFields, AccountFields]):UserProfileModel{
            let object = {};
            (record as UserSigninStepperType).forEach((stepForm)=>{
                object = {...object,...stepForm}
            });         
            const auth:AuthModel = {
                email:(object as (UserInfoFields & AddressFields & AccountFields)).email,
                password:(object as (UserInfoFields & AddressFields & AccountFields)).password
            }
            const address = record[1]
            const date_of_birth = dayjs((object as (UserInfoFields & AddressFields & AccountFields)).date_of_birth).format("DD/MM/YYYY")

            return {
                auth,
                address,
                ...record[0],
                date_of_birth,
                
            } as UserProfileModel
        }
    }
