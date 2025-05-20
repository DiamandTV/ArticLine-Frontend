import { apiBearToken } from "@lib/axios/api"
import { OrderInfoFieldsType } from "../models/Order/Field/OrderField"

async function create(orderInfo:OrderInfoFieldsType){
    return await apiBearToken.post('/order/create/',orderInfo)
}

async function list(page:number=1){
    return await apiBearToken.post(`/order/list/?page=${page}`)
}

async function retrieve(orderId:number){
    return await apiBearToken.get(`/order/${orderId}/retrieve/`)
}

async function update(orderId:number,orderInfo:OrderInfoFieldsType){
    return await apiBearToken.patch(`/order/${orderId}/retrieve/`,orderInfo

        
    )
}

async function _delete(orderId:number){
    return await apiBearToken.delete(`/order/${orderId}/delete/`)
}

export const orderServices = {
    create,
    retrieve,
    list,
    update,
    delete:_delete
}