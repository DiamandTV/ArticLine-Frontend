import api from "./api"
import { UserProfileModel } from "../models/user"
import { UserSigninStepperType  } from "../page/UserSignIn"
import { UserInfoFields } from "../components/forms/UserInfoForm"
import { AddressFields } from "../components/forms/AddressForm"
import { AccountFields } from "../components/forms/AccountForm"
import dayjs from "dayjs"
export const useUserService = 
     {
        async userSignin(userProfile:UserProfileModel){
            let data,error;
            console.log("USER SIGN IN SEND DATA")
            console.log(userProfile)
            try{
                data = await api.post('/user/signin/',userProfile)
                console.log("USER SIGN IN DATA")
                console.log(data)
            } catch(e){
                console.log("USER SIGN IN ERROR")
                console.log(e)
                error = e
            }
            return {data,error}
        },
        serializeFromStepperData(record:[UserInfoFields, AddressFields, AccountFields]):UserProfileModel{
            let object:Partial<UserInfoFields & AddressFields & AccountFields> = {};
            console.log("RECORD");
            console.log(record);
            (record as UserSigninStepperType).forEach((stepForm)=>{
                object = {...object,...stepForm}
            });         
            //const address = record[1]
            const date_of_birth = dayjs((object as (UserInfoFields & AddressFields & AccountFields)).date_of_birth).format("YYYY-MM-DD")
            
            return {
                auth:{
                    email: object.email,
                    password:object.password,
                    phone_number:object.phone_number
                },
                address:{
                    recipient_name:object.recipient_name,
                    street:object.street,
                    city:object.city,
                    province:object.province,
                    postal_code:object.postal_code,
                    country:object.country
                },
                first_name:object.first_name,
                last_name:object.last_name,
                username:object.username,
                date_of_birth:date_of_birth,
                
            } as UserProfileModel
        },
        decodeToStepperData(error:Record<string,string>):Record<string,string>{
            const playError:Record<string,unknown> = {};
            const recursive = (_key:string,_value:unknown)=>{
                if(_value && typeof _value === "object" && _value.constructor === Object){
                    Object.entries(_value).forEach(([_keyRecur,_valueRecur])=>recursive(_keyRecur,_valueRecur))

                } else {
                    playError[_key as string] = {message:_value[0]}
                }
            }
            Object.entries(error).forEach(([key,value])=>{
                recursive(key,value)
            })            
            console.log(playError)
            return playError as Record<string,string>
        }
    }
