import { StepperForm } from '../components/stepper/Stepper'
import { InfoForm } from '../components/forms/InfoForm'
import { AccountForm } from '../components/forms/AccountForm'
import { AddressForm } from '../components/forms/AddressForm'
import { StartView } from '../components/views/StartView'
export function CompanySignIn(){
    const getStep = (state:number)=>{
        switch(state){
            case 0:
                return <InfoForm/>
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
            />
        </StartView>
    )
}