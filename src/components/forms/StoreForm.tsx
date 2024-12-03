import { StartView } from "../../views/StartView"
import { StepperForm } from "../stepper/Stepper"
import { StepperGetStepDataProps } from "../stepper/Stepper"
import { AddressForm } from "./AddressForm"
import { StepperInfo } from "./StepperInfo"
import { StepperImageForm } from "./StepperImageForm"
export function StoreForm(){
    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return{
                    component:<StepperImageForm/>,
                    formsKeys:['image']
                }
            case 1:
                return {
                    component:<StepperInfo/>,
                    formsKeys:['store_title','store_categories','store_description']
                }
            case 2:
                return {
                    component:<AddressForm/>,
                    formsKeys:['address']
                }
            default:
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
                stepLabels={['STORE IMAGE','STORE INFO','STORE ADDRESS']}
                getStepData={getStepData}
                onFinish={async(record)=>{

                }}
            >
            </StepperForm>
        </StartView>
    )
}