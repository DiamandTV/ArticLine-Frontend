import { StoreCategoryFields } from "../components/Forms/StoreCategoryForm";
import { urlPattern } from "../constraints";
import { StoreModel } from "../models/store";
import { StoreCategoriesModel } from "../models/StoreCategories";
import { updateStoreCategory } from "../store/storeSlice";
import { api } from "./api";

export const useStoreCategoriesService = {
    async createStoreCategory({storeCategory}:{storeCategory:StoreCategoriesModel}){
        if(!storeCategory.store) return;
        return api.post(`store/details/${storeCategory.store}/sub_category/`,storeCategory)
    },
    async updateStoreCategory({storeCategory}:{storeCategory:StoreCategoriesModel}){
        return api.patch(`store/details/${storeCategory.store}/sub_category/${storeCategory.id}/update`,storeCategory)
    },
    async updateStoreCategoriesOrdered({storeCategory,order}:{storeCategory:StoreCategoriesModel,order:number}){
        return api.patch(`store/details/${storeCategory.store}/sub_category/${storeCategory.id}/order/update`,{order:order})
    },
    async deleteStoreCategory({storeCategory}:{storeCategory:StoreCategoriesModel}){
        return api.delete(`store/details/${storeCategory.store}/sub_category/${storeCategory.id}/delete`)
    },
    serilizeStoreCategoryData({storeCategory,store}:{storeCategory:StoreCategoryFields,store:StoreModel}):StoreCategoriesModel{
        const data:StoreCategoriesModel = {
            store:store.id,
            ...storeCategory
        }
        if (storeCategory.image.match(urlPattern)) delete data.image
        return data 
    }
}