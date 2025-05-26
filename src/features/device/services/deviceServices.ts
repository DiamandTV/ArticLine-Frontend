import { apiBearToken } from "@lib/axios/api"
import { DeviceInfoFieldsType } from "../model/Device/Fields/DeviceField"

async function create(deviceInfo:DeviceInfoFieldsType){
    return await apiBearToken.post('/company/device/create/',deviceInfo)
}

async function list(page:number=1,searchParams:URLSearchParams){
    const params = searchParams ? `&${searchParams.toString()}` : ''
    return await apiBearToken.get(`/company/device/list/?page=${page}${params}`)
}

async function retrieve(deviceId:number){
    return await apiBearToken.get(`/company/device/${deviceId}/retrieve/`)
}   

async function update(deviceId:number,deviceInfo:DeviceInfoFieldsType){
    return await apiBearToken.patch(`/company/device/${deviceId}/update/`,deviceInfo)
}

async function _delete(deviceId:number){
    return await apiBearToken.delete(`/company/device/${deviceId}/delete/`)
}

export const deviceServices = {
    create,
    list,
    retrieve,
    update,
    delete:_delete
}