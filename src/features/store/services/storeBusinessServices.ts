import { apiBearToken } from "@lib/axios/api"
import { StoreInfoFieldsType } from "../model/Store/Fields/StoreFields"
import { objToFormData } from "@utils/objToFormData/objToFormData"

export async function retrieve(){
    return await apiBearToken.get()
}

export async function list(page:string|number = 1){
    return await apiBearToken.get(`/store/company/list/?page=${page}`)
}

export async function create(storeInfo:StoreInfoFieldsType){
    console.log(storeInfo)
    let formData = new FormData()
    formData = objToFormData(formData,{...storeInfo,image:storeInfo.image[0]},'')
    console.log(formData)
    return await apiBearToken.post('/store/create/',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export async function update(){
    return await apiBearToken.patch()
}

export async function _delete(){
    return await apiBearToken.delete()
}


export const storeBusinessServices = {
    retrieve,
    list,
    create,
    update,
    delete:_delete
}