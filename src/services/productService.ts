import { ProductFormFields } from "../components/forms/ProductForm";
import { ProductModel } from "../models/Product";
import { StoreModel } from "../models/store";
import { StoreCategoriesModel } from "../models/StoreCategories";
import { api } from "./api";

export const useProductService = {
    async createProduct({product,storeId,storeCategoryId}:{product:ProductModel,storeId:string|number,storeCategoryId:string|number}){
        return api.post(`store/details/${storeId}/sub_category/${storeCategoryId}/`,product)
    },
    serilizeProductData({productData,store,storeCategories}:{productData:ProductFormFields,store:StoreModel,storeCategories:Array<StoreCategoriesModel>}):ProductModel|null{
        let storeCategoryID:number | undefined = undefined
        storeCategories.forEach((category)=>{
            if(category.name == productData.store_category) storeCategoryID = category.id
        })
        if(!storeCategoryID) return null;
        return {
            ...productData,
            store:store.id,
            store_category:storeCategoryID,
            temperature_start_range:productData.temperature[0],
            temperature_end_range:productData.temperature[1]
        }
    },

}