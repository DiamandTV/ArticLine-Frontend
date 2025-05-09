import { apiBearToken } from "@lib/axios/api"
import { StoreCategoryInfoFieldsType } from "../model/StoreCategory/Fields/StoreCategoryFields"
import { objToFormData } from "@utils/objToFormData/objToFormData"

function getFormDataFromStoreCategoryInfo(storeCategoryInfo:StoreCategoryInfoFieldsType){
    let formData = new FormData()
    formData = objToFormData(formData,storeCategoryInfo,'')
    console.log(formData)
    return formData
}

async function list(companyId:number,storeId:number,page:number=1){
    return await apiBearToken.get(`/company/${companyId}/store/${storeId}/category/list/?page=${page}`)
}

async function create(companyId:number,storeId:number,storeCategoryInfo:StoreCategoryInfoFieldsType){
    const formData = getFormDataFromStoreCategoryInfo(storeCategoryInfo)
    return await apiBearToken.post(`/company/${companyId}/store/${storeId}/category/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

async function update(companyId:number,storeId:number,storeCategoryId:number,storeCategoryInfo:StoreCategoryInfoFieldsType){
    const formData = getFormDataFromStoreCategoryInfo(storeCategoryInfo)
    return await apiBearToken.patch(`/company/${companyId}/store/${storeId}/category/${storeCategoryId}/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

async function _delete(companyId:number,storeId:number,storeCategoryId:number){
    return await apiBearToken.delete(`/company/${companyId}/store/${storeId}/category/${storeCategoryId}/delete/`)
}

export const storeBusinessCategoryServices = {
    list,
    create,
    update,
    delete:_delete
}