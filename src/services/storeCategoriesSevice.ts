import { StoreCategoryFields } from "../components/forms/StoreCategoryForm";
import { StoreModel } from "../models/store";
import { StoreCategoriesModel } from "../models/StoreCategories";
import { api } from "./api";

export const useStoreCategoriesService = {
    async createStoreCategory({storeCategory}:{storeCategory:StoreCategoriesModel}){
        if(!storeCategory.store) return;
        return api.post(`store/details/${storeCategory.store}/sub_category/`,storeCategory)
    },
    serilizeStoreCategoryData({storeCategory,store}:{storeCategory:StoreCategoryFields,store:StoreModel}):StoreCategoriesModel{
        return {
            store:store.id,
            ...storeCategory
        }
    }
}