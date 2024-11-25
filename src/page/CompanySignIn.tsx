import { StepperForm } from '../components/stepper/Stepper'
import { CompanyInfoForm } from '../components/forms/CompanyInfoForm'
import { AccountForm } from '../components/forms/AccountForm'
import { AddressForm } from '../components/forms/AddressForm'
import { StartView } from '../views/StartView'
import { AccountFields } from '../components/forms/AccountForm'
import { AddressFields } from '../components/forms/AddressForm'
import { CompanyInfoFields } from '../components/forms/CompanyInfoForm'
import { useCompanyService } from '../services/companyService'

// interface of the company sign in record (the record of the stepper form)
export type CompanySigninStepperType = Array<CompanyInfoFields | AddressFields | AccountFields>

export function CompanySignIn(){
    const getStep = (state:number)=>{
        switch(state){
            case 0:
                return <CompanyInfoForm/>
            case 1:
                return <AddressForm/>
            case 2:
                return <AccountForm/>
            default:
                // this is not used but i put this only for to be sure
                return <div></div>
        }
    }
    return (       
        <StartView>
            <StepperForm 
                maxStep={3}
                stepLabels={['COMPANY INFO','COMPANY ADDRESS','COMPANY DETAILS']}
                getStep={getStep}
                onFinish={(record)=>{
                    login(useCompanyService.stepperToProfileData(record))
                }}
            />
        </StartView>
    )
}