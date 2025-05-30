import { companyInfoFieldsSchema, CompanyProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { SigninFields } from "../SigninFields";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { GetStepFormDataReturnType } from "@models/multiFormStep/mutliFormStep";
import { authInfoFieldsSchema } from "@features/autentication/models/Auth/AuthInfoFields/AuthInfoFieldsType";
import { AuthInfoFields } from "../../AuthInfo/AuthInfoFields";
import { MultiFormStepperProvider } from "@context/MultiFormStepper/MultiFormStepperProvider";
import { CompanyProfileInfoFields } from "../../ProfileInfo/CompanyProfileInfoFields/CompanyProfileInfoFields";
import { companySigninService } from "@features/autentication/services/signinServices";
import { CompanySigninFieldsType } from "@features/autentication/models/SigninFields/SigninFieldsType";
import { useNavigate } from "react-router";

export const CompanySigninFieldsProvider = FieldsProvider<CompanyProfileInfoFieldsType>

const getStepFormData = (step:number):GetStepFormDataReturnType=>{
    switch(step){
        case 0:
            return {
                schema:companyInfoFieldsSchema,
                children:<CompanyProfileInfoFields/>
            }
        case 1:
            return {
                schema:authInfoFieldsSchema,
                children:<AuthInfoFields/>
            }
        default:
            return null
    }
}


export function CompanySigninFields(props:FieldsProps){
    const navigator = useNavigate()
    return(
        <CompanySigninFieldsProvider schema={companyInfoFieldsSchema}>
            <MultiFormStepperProvider
                initialStep={0}
                totalSteps={2}
                getStepFormData={getStepFormData}
                mutationOptions={{
                    mutationKey:['company'],
                    mutationFn:async(formData:CompanySigninFieldsType)=>{
                        const data = await companySigninService(formData)
                        console.log(data)
                        return data
                    },
                    onSuccess:(data)=>{
                        console.log(data)
                        navigator('/signin/done/',{state:{didSignin:true},replace:true})
                    }
                }}
            >
                <SigninFields {...props}/>
            </MultiFormStepperProvider>
        </CompanySigninFieldsProvider>
    )
}