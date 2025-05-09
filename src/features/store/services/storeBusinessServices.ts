import { apiBearToken } from "@lib/axios/api"
import { StoreInfoFieldsTransformedType } from "../model/Store/Fields/StoreFields"
import { objToFormData } from "@utils/objToFormData/objToFormData"

function getFormDataFromStore(storeInfo:StoreInfoFieldsTransformedType){
    let formData = new FormData()
    formData = objToFormData(formData,storeInfo,'')
    return formData
}

export async function retrieve(companyId:number,storeId:number){
    return await apiBearToken.get(`/company/${companyId}/store/company/${storeId}/retrieve/`)
}

export async function list(companyId:number,page:string|number = 1){
    return await apiBearToken.get(`/company/${companyId}/store/company/list/?page=${page}`)
}

export async function create(companyId:number,storeInfo:StoreInfoFieldsTransformedType){
    const formData = getFormDataFromStore(storeInfo)
    return await apiBearToken.post(`/company/${companyId}/store/company/create/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export async function update(companyId:number,storeId:number,storeInfo:StoreInfoFieldsTransformedType){
    const formData = getFormDataFromStore(storeInfo)
    return await apiBearToken.patch(`/company/${companyId}store/company/${storeId}/update/`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export async function _delete(companyId:number,storeId:number){
    return await apiBearToken.delete(`/company/${companyId}store/company/${storeId}/delete/`)
}


export const storeBusinessServices = {
    retrieve,
    list,
    create,
    update,
    delete:_delete
}