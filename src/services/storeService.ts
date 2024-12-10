import { api } from "./api"

export const useStoreService = {
    async getStoreDetails(storeId:string){
        return await api.get(`store/details/${storeId}`)
    },
    async getStoreCategoryProducts({storeId,storeCategoryId,page=0}:{storeId:string,storeCategoryId:string,page?:number}){
        return await api.get(`store/details/${storeId}/sub_category/${storeCategoryId}/?page=${page}`)
    }
}