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
import { siginMutationOptions } from "@features/autentication/utils/signin/mutationOptions";

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
    return(
        <UserSigninFieldsProvider schema={userSigninFieldsSchema}>
            <MultiFormStepperProvider
                initialStep={0}
                totalSteps={2}
                getStepFormData={getStepFormData}
                mutationOptions={siginMutationOptions({
                    mutationKey:["user"],
                    mutationFn:async()=>{

                    }
                })}
            >
                <SigninFields {...props}/>
            </MultiFormStepperProvider>
        </UserSigninFieldsProvider>
    )   
}