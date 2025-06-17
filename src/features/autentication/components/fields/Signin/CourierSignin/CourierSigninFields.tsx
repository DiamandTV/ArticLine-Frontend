import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { courierSigninFieldsSchema, CourierSigninFieldsType } from "@features/autentication/models/SigninFields/SigninFieldsType";
import { SigninFields } from "../SigninFields";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { GetStepFormDataReturnType } from "@models/multiFormStep/mutliFormStep";
import { authInfoFieldsSchema } from "@features/autentication/models/Auth/AuthInfoFields/AuthInfoFieldsType";
import { AuthInfoFields } from "../../AuthInfo/AuthInfoFields";
import { MultiFormStepperProvider } from "@context/MultiFormStepper/MultiFormStepperProvider";
import { CourierProfileInfoFields } from "../../ProfileInfo/CourierProfileInfoFields/CourierProfileInfoFields";
import { courierSigninService } from "@features/autentication/services/signinServices";
import { courierProfileInfoFieldsSchema } from "@features/autentication/models/Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";

export const CourierSigninFieldsProvider = FieldsProvider<CourierSigninFieldsType>

const getStepFormData = (step:number):GetStepFormDataReturnType=>{
    switch(step){
        case 0:
            return {
                schema:courierProfileInfoFieldsSchema,
                children:<CourierProfileInfoFields/>
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


export function CourierSigninFields(props:FieldsProps){
    return(
        <CourierSigninFieldsProvider schema={courierSigninFieldsSchema}>
            <MultiFormStepperProvider
                initialStep={0}
                totalSteps={2}
                getStepFormData={getStepFormData}
                mutationOptions={{
                    mutationKey:['courier'],
                    mutationFn:async(formData:CourierSigninFieldsType)=>{
                        console.log(formData)
                        const data = await courierSigninService(formData)
                        console.log(data)
                        return data
                    },

                    onSuccess:(data)=>{
                        console.log(data)
                        // todo : tell the courier to proceed from the mobile application

                    }
                }}
            >
                <SigninFields {...props}/>
            </MultiFormStepperProvider>
        </CourierSigninFieldsProvider>
    )
}