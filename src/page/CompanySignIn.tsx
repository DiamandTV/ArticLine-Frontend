import { StepperForm } from '../components/stepper/Stepper'
import { CompanyInfoForm } from '../components/forms/CompanyInfoForm'
import { AccountForm } from '../components/forms/AccountForm'
import { AddressForm } from '../components/forms/AddressForm'
import { StartView } from '../views/StartView'
import { AccountFields } from '../components/forms/AccountForm'
import { AddressFields } from '../components/forms/AddressForm'
import { CompanyInfoFields } from '../components/forms/CompanyInfoForm'
import { useCompanyService } from '../services/companyService'
import { CompanyProfileModel } from '../models/company'
import { StepperGetStepDataProps } from '../components/stepper/Stepper'
import { Finish } from '../views/Finish'
// interface of the company sign in record (the record of the stepper form)
export type CompanySigninStepperType = Array<CompanyInfoFields | AddressFields | AccountFields>

export function CompanySignIn(){
    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return {
                    component:<CompanyInfoForm/>,
                    formsKeys:['first_name','last_name','company_name','date_of_foundation']
                } 
                
            case 1:
                return {
                    component:<AddressForm/>,
                    formsKeys:['address']
                }
            case 2:
                return {
                    component:<AccountForm/>,
                    formsKeys:['auth']
                }
            case 3:
                return {
                    component: (
                        <Finish
                            queryKey={['company-signin']}
                            loader={{
                                message:{
                                    error:"SOMETHING WENT WRONG",
                                    success:"COMPANY ACCOUNT CREATED"
                                },
                                redirect:(data) => {
                                    return data.isSuccess
                                },
                            }}
                        />
                    ),
                    formsKeys:[]
                }
            default:
                // this is not used but i put this only for to be sure
                return {
                    component:<div></div>,
                    formsKeys:[]
                }
        }
    }
    return (       
        <StartView>
            <StepperForm 
                maxStep={4}
                stepLabels={['COMPANY INFO','COMPANY ADDRESS','COMPANY DETAILS']}
                getStepData={getStepData}
                onFinish={async (record)=>{
                   console.log(record)
                   return await useCompanyService.companySignin(
                    useCompanyService.serializeFromStepperData(record as [CompanyProfileModel, AddressFields, AccountFields])
                   )
                }}
            />
        </StartView>
    )
}