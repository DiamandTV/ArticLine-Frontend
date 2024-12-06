import { storeService } from "../../services/storeService"
import { Finish } from "../../views/SignInFinish"
import { StepperForm } from "../stepper/Stepper"
import { StepperGetStepDataProps } from "../stepper/Stepper"
import { AddressFields, AddressForm } from "./AddressForm"
import { StoreInfo, StoreInfoFields } from "./StoreInfo"
import { StoreImageForm } from "./StoreImageForm"
import { useDispatch } from "react-redux"
import { addStore } from "../../store/profileSlice"
export type StoreStepperType = [{images:Array<string>},StoreInfoFields,AddressFields]
export function StoreForm(){
    const dispatch = useDispatch()

    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return{
                    component:<StoreImageForm/>,
                    formsKeys:['images']
                }
            case 1:
                return {
                    component:<StoreInfo/>,
                    formsKeys:['title','categories','description']
                }
            case 2:
                return {
                    component:<AddressForm/>,
                    formsKeys:['address']
                }
            case 3:
                return {
                    component:(
                        <Finish
                            queryKey={['store-create']}
                            onSuccess={(data)=>{
                                dispatch(addStore(data.data))
                            }}
                            loader={{
                                message:{
                                    error:"ERROR CREATING THE STORE",
                                    success:"STORE CREATED"
                                },
                            redirect:() => {
                                return false;
                            }
                        }}
                        />
                    ),
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