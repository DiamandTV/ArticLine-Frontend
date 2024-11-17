import { UserInfo } from '../components/userSignSteps/UserInfo'
import { AccountForm } from '../components/forms/AccountForm'
import { AddressForm } from '../components/forms/AddressForm'
import { StartView } from '../components/views/StartView'
import { StepperForm } from '../components/stepper/Stepper'
export function UserSignIn(){
    const getStep = (state:number)=>{
        switch(state){
            case 0:
                return <UserInfo/>
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
                stepLabels={['USER INFO','USER ADDRESS','USER DETAILS']}
                getStep={getStep}
            />
        </StartView>
    )
}