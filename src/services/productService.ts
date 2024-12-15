import { ProductFormFields } from "../components/forms/ProductForm";
import { urlPattern } from "../constraints";
import { ProductModel } from "../models/Product";
import { StoreModel } from "../models/store";
import { StoreCategoriesModel } from "../models/StoreCategories";
import { api } from "./api";

export const useProductService = {
    async createProduct({product,storeId,storeCategoryId}:{product:ProductModel,storeId:string|number,storeCategoryId:string|number}){
        return api.post(`store/details/${storeId}/sub_category/${storeCategoryId}/`,product)
    },
    async updateProduct({product}:{product:ProductModel}){
        return api.patch(`store/details/${product.store}/sub_category/${product.store_category}/${product.id}/update`,product)
    },
    async deleteProduct({product}:{product:ProductModel}){
        console.log(product)
        return api.delete(`store/details/${product.store}/sub_category/${product.store_category}/${product.id}/delete`)
    },
    serilizeProductData({productData,store,storeCategories}:{productData:ProductFormFields,store:StoreModel,storeCategories:Array<StoreCategoriesModel>}):ProductModel|null{
        let storeCategoryID:number | undefined = undefined
        storeCategories.forEach((category)=>{
            if(category.name == productData.store_category) storeCategoryID = category.id
        })
        if(!storeCategoryID) return null;
        const data:ProductModel = {
            ...productData,
            store:store.id,
            store_category:storeCategoryID,
            temperature_start_range:productData.temperature[0],
            temperature_end_range:productData.temperature[1]
        }
        if(productData.image.match(urlPattern)) delete data.image
        return data  
    },
    decodeProductData({product,storeCategories}:{product:ProductModel|undefined,storeCategories:Array<StoreCategoriesModel>}):ProductFormFields|undefined{
        if(!product) return undefined
        const storeCategoryName = storeCategories.find((store)=>store.id === product.store_category)?.name
        return{
            ...product,
            image:product.image ?? "",
            store_category:storeCategoryName ? storeCategoryName : "",
            temperature:[product.temperature_start_range,product.temperature_end_range]
        }
    }

}