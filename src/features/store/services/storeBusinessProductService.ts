import { apiBearToken } from "@lib/axios/api";
import { ProductInfoFieldsType } from "../model/Product/Fields/ProductFields";
import { objToFormData } from "@utils/objToFormData/objToFormData";

async function list(storeId:number,storeCategoryId:number,page:number=1){
    return await apiBearToken.get(`/store/${storeId}/category/${storeCategoryId}/product/list/?page=${page}`)
}

async function create(storeId:number,storeCategoryId:number,productInfo:ProductInfoFieldsType){
    let formData = new FormData()
    formData = objToFormData(formData,productInfo,'')
    return apiBearToken.post(`/store/${storeId}/category/${storeCategoryId}/product/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export const storeBusinessProductServices = {
    list,
    create
}