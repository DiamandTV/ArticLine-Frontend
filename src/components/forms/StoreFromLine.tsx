// !!! INLINE STORE FORM MODE
import { StepperForm } from "../stepper/Stepper"
import { StepperGetStepDataProps } from "../stepper/Stepper"
import { AddressFields, AddressForm } from "./AddressForm"
import { StoreInfo, StoreInfoFields } from "./StoreInfo"
import { StoreImageForm } from "./StoreImageForm"
import { companyStoreService } from "../../services/companyStoreService"
import { useDispatch } from "react-redux"
import { addStore } from "../../store/profileSlice"
import { FinishLine } from "../../views/FinishLine"
import { useNavigate } from "react-router-dom"
import { StoreModel } from "../../models/store"
export type StoreStepperType = [{images:Array<string>},StoreInfoFields,AddressFields]
export function StoreFormLine({store}:{store?:StoreModel}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return{
                    component:<StoreImageForm indexStepper={0} className="max-h-56"/>,
                    formsKeys:['images']
                }
            case 1:
                return {
                    component:<StoreInfo indexStepper={1}/>,
                    formsKeys:['title','categories','description']
                }
            case 2:
                return {
                    component:<AddressForm indexStepper={2}/>,
                    formsKeys:['address']
                }
            case 3:
                return {
                    component:(
                    <FinishLine
                        button={{
                            text:"CREATE STORE",
                            onClick:()=>{

                            }
                        }}
                        queryKey={['store-create']}
                        onSuccess={(data)=>{
                            const storeData = data.data as StoreModel
                            navigate(`/store/details/${storeData.id}/`)
                            dispatch(addStore(data.data))
                        }}
                        onError={()=>{

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
                singleLine
                maxStep={4}
                stepLabels={['STORE IMAGE','STORE INFO','STORE ADDRESS']}
                getStepData={getStepData}
                defaultValue={companyStoreService.decodeToStepperData(store)}
                onFinish={async(record)=>{
                    //alert("OK")
                    return await companyStoreService.createStore(
                        companyStoreService.serializeFromStepperData(record as StoreStepperType)
                    )
                }}
            >
            </StepperForm>
    )
}