import { SigninFinish } from "../../views/SignInFinish"
import { StartView } from "../../views/StartView"
import { StepperForm } from "../stepper/Stepper"
import { StepperGetStepDataProps } from "../stepper/Stepper"
import { AddressForm } from "./AddressForm"
import { StepperInfo } from "./StepperInfo"
import { StoreImageForm } from "./StoreImageForm"
export function StoreForm(){
    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return{
                    component:<StoreImageForm/>,
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
            case 3:
                return {
                    component:<SigninFinish/>,
                    formsKeys:[]
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
                    //alert("OK")
                    console.log(record)
                }}
            >
            </StepperForm>
        </StartView>
    )
}