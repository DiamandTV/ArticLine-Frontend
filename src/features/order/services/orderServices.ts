import { apiBearToken } from "@lib/axios/api"

async function create(){
    return await apiBearToken.post('/order/create/')
}

async function list(page:number=1){
    return await apiBearToken.post(`/order/list/?page=${page}`)
}

async function retrieve(orderId:number){
    return await apiBearToken.get(`/order/${orderId}/retrieve/`)
}

async function update(orderId:number){
    return await apiBearToken.patch(`/order/${orderId}/retrieve/`)
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