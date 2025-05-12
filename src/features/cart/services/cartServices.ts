import { apiBearToken } from "@lib/axios/api"

async function list(){
    return await apiBearToken.get(`/cart/list/`)
}

async function _delete(cartId:number){
    return await apiBearToken.delete(`/cart/${cartId}/delete/`)
}

export const cartServices = {
    list,
    delete:_delete
}