import { StoreFormFields } from "../components/Forms/StoreForm"
import { urlPattern } from "../constraints"
import { ImageModel } from "../models/image"
import { api } from "./api"
export const companyStoreService = {
    async getCategories(){
        const data = await api.get('/store/categories')
        return data;
    },
    async createStore(store:StoreFormFields){
        return await api.post('/store/company/',store)
    },
    async updateStore({store,storeId}:{store:StoreFormFields,storeId:string|undefined|number}){
        return await api.put(`/store/details/${storeId}/update`,store)
    },
    async deleteStore(storeId:string|number|undefined){
        return await api.delete(`/store/details/${storeId}/delete`)
    },
    // async getCompanyStoresPage(){
    //     return await api.get('/store/company')
    // },
    async getCompanyStores({page='1'}:{page:string|number|undefined}){
        //const PAGE = 1
        const data = await api.get(`/store/company/?page=${page}`)
        return data
    },
    filterImagesWithOutUrl(store:StoreFormFields):StoreFormFields{
        return {...store,images:store.images.filter((image:ImageModel)=>!image.image?.match(urlPattern))}
    }
    // serializeFromStepperData(record:StoreStepperType){
    //     let object:Partial<StoreModel> = {}
    //     record.forEach((stepForm)=>{
    //         object = {...object,...stepForm}
    //     }); 
    //     console.log(
    //         {
    //             ...(object as (StoreInfoFields & AddressFields)) ,
    //             images:record[0].images,
    //         }  
    //     )
    //     return {
    //         ...(object as (StoreInfoFields & AddressFields)) ,
    //         // filter the images to avoid sending the images with url( the images which aren't been updated)
    //         images:record[0].images.filter((image)=>!image.image?.match(urlPattern)),
    //     }  
    // },
    // async convertUrlToBase(image:string|null){
    //     if(!image) return ""
    //     const data = await fetch(image)
    //     const blob = await data.blob()
    //     return new Promise((resolve,reject)=>{
    //         const reader = new FileReader()
    //         reader.readAsDataURL(blob)
    //         reader.onload = ()=>{
    //             const base64data = reader.result
    //             resolve(base64data)
    //         }
    //         reader.onerror = reject

    //     })
    // },

    // decodeToStepperData(store?:StoreModel):StoreStepperType|null{
    //     if(!store) return null;
    //     // const baseImages:PromiseArray<ImageModel> = store.images.map(async(image)=>{
    //     //     const _baseImage = await this.convertUrlToBase(image.image)
    //     //     return {
    //     //         ...image,
    //     //         image:_baseImage 
    //     //     }
    //     // })
    //     return[
    //         {images:store.images} ,
    //         {
    //             title:store.title,
    //             description:store.description,
    //             categories:store.categories
    //         },
    //         {address:{...store.address}}
    //     ]
    // }
}