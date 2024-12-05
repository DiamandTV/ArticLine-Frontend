import { AddressFields } from "../components/forms/AddressForm"
import { StoreStepperType } from "../components/forms/StoreForm"
import { StepperInfoFields } from "../components/forms/StoreInfo"
import { StoreModel } from "../models/store"
import api from "./api"
export const storeService = {
    async getCategories(){
        await api.get('/store/categories')
    },
    async createStore(store:StoreStepperType){
        await api.post('/store/create',store)
    },
    serializeFromStepperData(record:StoreStepperType):StoreModel{
        let object:Partial<StoreModel> = {}
        record.forEach((stepForm)=>{
            object = {...object,...stepForm}
        }); 
        return {
            ...(object as (StepperInfoFields & AddressFields)) ,
            images:record[0],
        }  
    }
}