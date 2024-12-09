import { api } from "./api"

export const useStoreService = {
    async getStoreDetails(storeId:string){
        return await api.get(`store/details/${storeId}`)
    },
    async getStoreCategoryProducts(storeCategoryId:string){
        return await api.get(`store/details/product/${storeCategoryId}`)
    }
}