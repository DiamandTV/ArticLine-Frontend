import { storeService } from "../../services/storeService"
import { store } from "../../store/store"
import { SigninFinish } from "../../views/SignInFinish"
import { StartView } from "../../views/StartView"
import { BlurCard } from "../cards/BlurCard"
import { StepperForm } from "../stepper/Stepper"
import { StepperGetStepDataProps } from "../stepper/Stepper"
import { AddressFields, AddressForm } from "./AddressForm"
import { StoreInfo, StoreInfoFields } from "./StoreInfo"
import { StoreImageForm } from "./StoreImageForm"
export type StoreStepperType = [Array<string>,StoreInfoFields,AddressFields]
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
                    component:<StoreInfo/>,
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
            <StepperForm
                maxStep={4}
                stepLabels={['STORE IMAGE','STORE INFO','STORE ADDRESS']}
                getStepData={getStepData}
                onFinish={async(record)=>{
                    //alert("OK")
                    await storeService.createStore(
                        storeService.serializeFromStepperData(record as StoreStepperType)
                    )
                    console.log(record)
                }}
            >
            </StepperForm>
    )
}