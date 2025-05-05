import { apiBearToken } from "@lib/axios/api";
import { ProductInfoFieldsType } from "../model/Product/Fields/ProductFields";
import { objToFormData } from "@utils/objToFormData/objToFormData";

function getFromDataFromProduct(productInfo:ProductInfoFieldsType){
    let formData = new FormData()
    formData = objToFormData(formData,productInfo,'')
    return formData
}

async function list(storeId:number,storeCategoryId:number,page:number=1){
    return await apiBearToken.get(`/store/${storeId}/category/${storeCategoryId}/product/list/?page=${page}`)
}

async function create(storeId:number,storeCategoryId:number,productInfo:ProductInfoFieldsType){
    const formData = getFromDataFromProduct(productInfo)
    return apiBearToken.post(`/store/${storeId}/category/${storeCategoryId}/product/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

async function update(storeId:number,storeCategoryId:number,productId:number,productInfo:ProductInfoFieldsType){
    const formData = getFromDataFromProduct(productInfo)
    return apiBearToken.patch(`/store/${storeId}/category/${storeCategoryId}/product/${productId}/update/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}


async function _delete(storeId:number,storeCategoryId:number,productId:number){
    return apiBearToken.patch(`/store/${storeId}/category/${storeCategoryId}/product/${productId}/delete/`)
}

export const storeBusinessProductServices = {
    list,
    create,
    update,
    delete:_delete
}