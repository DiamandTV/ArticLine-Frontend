import { apiBearToken } from "@lib/axios/api"
import { EntityAddressInfoFieldsType } from "../models/EntityAddress/Field/EntityAddressFields"


async function create(entityAddressInfo:EntityAddressInfoFieldsType){
    return await apiBearToken.post(`/entity/address/create/`,entityAddressInfo)
}

async function list(page:number=1){
    return await apiBearToken.get(`/entity/address/list/?page=${page}`)
}

async function retrieve(entityAddressId:number){
    return await apiBearToken.get(`/entity/address/${entityAddressId}/retrieve/`)
}

async function update(entityAddressId:number,entityAddressInfo:EntityAddressInfoFieldsType){
    return await apiBearToken.patch(`/entity/address/${entityAddressId}/update/`,entityAddressInfo)
}

async function _delete(entityAddressId:number){
    return await apiBearToken.delete(`/entity/address/${entityAddressId}/delete/`)
}

async function setDefault(entityAddressId:number) {
    return await apiBearToken.patch(`/entity/address/${entityAddressId}/set-default/`)
}

export const entityAddressService = {
    retrieve,
    create,
    list,
    update,
    delete:_delete,

    setDefault
}
