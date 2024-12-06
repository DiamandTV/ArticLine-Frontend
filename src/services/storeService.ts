import { AddressFields } from "../components/forms/AddressForm"
import { StoreStepperType } from "../components/forms/StoreForm"
import { StoreInfoFields } from "../components/forms/StoreInfo"
import { StoreModel } from "../models/store"
import api from "./api"
export const storeService = {
    async getCategories(){
        return await api.get('/store/categories')
    },
    async createStore(store:StoreStepperType){
        console.log(store)
        return await api.post('/store/create',store)
    },
    serializeFromStepperData(record:StoreStepperType){
        let object:Partial<StoreModel> = {}
        record.forEach((stepForm)=>{
            object = {...object,...stepForm}
        }); 
        console.log(
            {
                ...(object as (StoreInfoFields & AddressFields)) ,
                images:record[0].images,
            }  
        )
        return {
            ...(object as (StoreInfoFields & AddressFields)) ,
            images:record[0].images,
        }  
    }
}