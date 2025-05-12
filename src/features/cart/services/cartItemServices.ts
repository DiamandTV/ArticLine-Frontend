import { apiBearToken } from "@lib/axios/api"

async function create(){
    return await apiBearToken.post(`/cart/item/create/`)
}

async function update(cartId:number,cart:unknown){
    return await apiBearToken.patch(`/cart/item/${cartId}/update/`,cart)
}

async function list(page:number=1){
    return await apiBearToken.get(`/cart/item/list/?page=${page}`)
}

async function _delete(cartId:number){
    return await apiBearToken.delete(`/cart/item/${cartId}/delete/`)
}

export const cartItemServices = {
    create,
    list,
    update,
    delete:_delete
}

