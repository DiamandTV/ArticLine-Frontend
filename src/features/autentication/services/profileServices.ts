import { apiBearToken } from "@lib/axios/api"
import { ProfileInfoFieldsType } from "../models/Profile/Interface/Type"
import { objToFormData } from "@utils/objToFormData/objToFormData"

function getFormDataFromProfile(profileInfo:ProfileInfoFieldsType){
    let formData = new FormData()
    formData = objToFormData(formData,profileInfo,'')
    return formData
}

async function retrieve(){
    return await apiBearToken.get('/profile/retrieve/')
}

async function update(profileInfo:ProfileInfoFieldsType){
    const formData = getFormDataFromProfile(profileInfo)
    console.log(Array.from(formData))
    return await apiBearToken.patch('/profile/update/',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

async function _delete(){
    return await apiBearToken.delete('/profile/delete/')
}

async function companyCourierList(page:number=1,searchParams:URLSearchParams){
    const params = searchParams ? `&${searchParams.toString()}` : ''
    return await apiBearToken.get(`/company/courier/list/?page=${page}${params}`)
}

export const profileServices = {
    retrieve,
    update,
    delete:_delete,

    companyCourierList
}