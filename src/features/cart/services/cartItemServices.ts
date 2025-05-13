import { apiBearToken } from "@lib/axios/api"
import { CartItemInfoFieldsType } from "../model/CartItem/Field/CartItemField"

// async function create(){
//     return await apiBearToken.post(`/cart/item/create/`)
// }

// async function update(cartId:number,cart:unknown){
//     return await apiBearToken.patch(`/cart/item/${cartId}/update/`,cart)
// }

async function add(cartItem:CartItemInfoFieldsType){
    return await apiBearToken.post('/cart/item/add-update/',cartItem)
}

async function retrieve(cartId:number,productItemId:number){
    return apiBearToken.get(`cart/${cartId}/${productItemId}/item/retrieve/`)
}

async function list(cartId:number,page:number=1){
    return await apiBearToken.get(`/cart/${cartId}/item/list/?page=${page}`)
}

async function _delete(cartId:number){
    return await apiBearToken.delete(`/cart/item/${cartId}/delete/`)
}

export const cartItemServices = {
    //create,
    add,
    retrieve,
    list,
    //update,
    delete:_delete
}

