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
            console.log(userProfile)
            const data = await api.post('/user/signin/',userProfile)
            return data 
        },
        
        serializeFromStepperData(record:[UserInfoFields, AddressFields, AccountFields]):UserProfileModel{
            let object:Partial<UserProfileModel> = {};
            console.log("RECORD");
            console.log(record);
            (record as UserSigninStepperType).forEach((stepForm)=>{
                object = {...object,...stepForm}
            });         
            console.log(object)
            //const address = record[1]
            return {...object,date_of_birth:dayjs(object.date_of_birth).format("YYYY-MM-DD")} as UserProfileModel
        }
        ,
        /*
        decodeToStepperData(error:Record<string,string>):Record<string,string>{
            const playError:Record<string,unknown> = {};
            const recursive = (_key:string,_value: Array<string> | string)=>{
                if(_value && typeof _value === "object" && _value.constructor === Object){
                    Object.entries(_value).forEach(([_keyRecur,_valueRecur])=>recursive(_keyRecur,_valueRecur))

                } else {
                    playError[_key as string] = {message:_value[0]}
                }
            }
            Object.entries(error).forEach(([key,value])=>{
                recursive(key,value)
            })            
            
            return playError as Record<string,string>
        
        }*/
}
