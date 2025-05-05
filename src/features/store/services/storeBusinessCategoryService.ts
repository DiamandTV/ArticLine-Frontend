import { apiBearToken } from "@lib/axios/api"
import { StoreCategoryInfoFieldsType } from "../model/StoreCategory/Fields/StoreCategoryFields"
import { objToFormData } from "@utils/objToFormData/objToFormData"

function getFormDataFromStoreCategoryInfo(storeCategoryInfo:StoreCategoryInfoFieldsType){
    let formData = new FormData()
    formData = objToFormData(formData,storeCategoryInfo,'')
    console.log(formData)
    return formData
}

async function list(storeId:number,page:number=1){
    return await apiBearToken.get(`/store/${storeId}/category/list/?page=${page}`)
}

async function create(storeId:number,storeCategoryInfo:StoreCategoryInfoFieldsType){
    const formData = getFormDataFromStoreCategoryInfo(storeCategoryInfo)
    return await apiBearToken.post(`/store/${storeId}/category/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export const storeBusinessCategoryServices = {
    list,
    create
}