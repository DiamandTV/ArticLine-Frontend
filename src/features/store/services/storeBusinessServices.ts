import { apiBearToken } from "@lib/axios/api"
import { StoreInfoFieldsTransformedType } from "../model/Store/Fields/StoreFields"
import { objToFormData } from "@utils/objToFormData/objToFormData"

export async function retrieve(id:number){
    return await apiBearToken.get(`/store/company/${id}/retrieve/`)
}

export async function list(page:string|number = 1){
    return await apiBearToken.get(`/store/company/list/?page=${page}`)
}

export async function create(storeInfo:StoreInfoFieldsTransformedType){
    console.log(storeInfo)
    let formData = new FormData()
    formData = objToFormData(formData,storeInfo,'')
    console.log(formData)
    return await apiBearToken.post('/store/company/create/',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export async function update(id:number,storeInfo:StoreInfoFieldsTransformedType){
    return await apiBearToken.patch(`store/company/${id}/update/`,storeInfo)
}

export async function _delete(id:number){
    return await apiBearToken.delete(`store/company/${id}/delete/`)
}


export const storeBusinessServices = {
    retrieve,
    list,
    create,
    update,
    delete:_delete
}