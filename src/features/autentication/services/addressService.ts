import { apiBearToken } from "@lib/axios/api"
import { AddressInfoFieldsType } from "../models/Address/AddressInfoFields/AddressInfoFieldsType"

async function retrieve(){
    return await apiBearToken.get('')
}

async function create(addressInfo:AddressInfoFieldsType){
    return await apiBearToken.post('',addressInfo)
}

async function list(page:number=1){
    return await apiBearToken.get('')
}

async function update(addressId:number,addressInfo:AddressInfoFieldsType){
    return await apiBearToken.patch('',addressInfo)
}

async function _delete(addressId){
    return await apiBearToken.delete('')
}

export const addressService = {
    retrieve,
    create,
    list,
    update,
    delete:_delete
}
