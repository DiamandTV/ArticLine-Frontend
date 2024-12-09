import { AddressFields } from "../components/forms/AddressForm"
import { StoreStepperType } from "../components/forms/StoreForm"
import { StoreInfoFields } from "../components/forms/StoreInfo"
import { StoreModel } from "../models/store"
import { api } from "./api"
export const companyStoreService = {
    async getCategories(){
        return await api.get('/store/categories')
    },
    async createStore(store:StoreStepperType){
        return await api.post('/store/company',store)
    },
    async getCompanyStoresPage(){
        return await api.get('/store/company')
    },
    async getCompanyStores(){
        //const PAGE = 1
        const data = await api.get(`/store/company`)
        return data
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