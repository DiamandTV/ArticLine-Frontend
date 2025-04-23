import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { userSigninFieldsSchema, UserSigninFieldsType } from "@features/autentication/models/SigninFields/SigninFieldsType";
import { SigninFields } from "../SigninFields";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { MultiFormStepperProvider } from "@context/MultiFormStepper/MultiFormStepperProvider";
import { AuthInfoFields } from "../../AuthInfo/AuthInfoFields";
import { authInfoFieldsSchema } from "@features/autentication/models/Auth/AuthInfoFields/AuthInfoFieldsType";
import { UserProfileInfoFields } from "../../ProfileInfo/UserProfileInfoFields/UserProfileInfoFields";
import { userProfileInfoFieldsSchema } from "@features/autentication/models/Profile/InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType";
import { GetStepFormDataReturnType } from "@models/multiFormStep/mutliFormStep";
import { userSigninService } from "@features/autentication/services/signinServices";
import {  useNavigate } from "react-router";
//import { userSigninService } from "@features/autentication/services/signinServices";

export const UserSigninFieldsProvider = FieldsProvider<UserSigninFieldsType>


const getStepFormData = (step:number):GetStepFormDataReturnType=>{
    switch(step){
        case 0:
            return {
                schema:userProfileInfoFieldsSchema,
                children:<UserProfileInfoFields/>
            }
        case 1:
            return {
                schema:authInfoFieldsSchema,
                children:<AuthInfoFields />
            }
        default:
            return null
    }
}


export function UserSigninFields(props:FieldsProps){
    const navigator = useNavigate()
    return(
        <UserSigninFieldsProvider schema={userSigninFieldsSchema}>
            <MultiFormStepperProvider
                initialStep={0}
                totalSteps={2}
                getStepFormData={getStepFormData}
                mutationOptions={{
                    mutationKey:["user"],
                    mutationFn:async(formData:UserSigninFieldsType)=>{
                        const data = await userSigninService(formData)
                        console.log(data)
                        return data
                    },

                    onSuccess:(data)=>{
                        console.log(data)
                        navigator('/signin/done/',{state:{didSignin:true},replace:true})
                    },
                   
                }}
            >
                
                <SigninFields {...props}/>
            </MultiFormStepperProvider>
        </UserSigninFieldsProvider>
    )   
}