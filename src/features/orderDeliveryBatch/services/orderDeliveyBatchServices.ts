import { apiBearToken } from "@lib/axios/api"

async function create(orderDeliveryBatchInfo:unknown){
    return await apiBearToken.post(`/order-delivery-batch/business/create/`,orderDeliveryBatchInfo)
}

async function list(page:number=1,searchParams:URLSearchParams){
    const params = searchParams ? `&${searchParams.toString()}` : ''
    return await apiBearToken.get(`/order-delivery-batch/business/list/?page=${page}${params}`)
}
async function retrieve(orderDeliveryBatchId:number){
    return await apiBearToken.get(`/order-delivery-batch/business/${orderDeliveryBatchId}/retrieve/`)
}

async function update(orderDeliveryBatchId:number,orderDeliveryBatchInfo:unknown){
    return await apiBearToken.patch(`/order-delivery-batch/business/${orderDeliveryBatchId}/update/`,orderDeliveryBatchInfo)
}

async function _delete(orderDeliveryBatchId:number){
    return await apiBearToken.delete(`/order-delivery-batch/business/${orderDeliveryBatchId}/delete/`,{})
}

async function listOrders(page:number=1,orderDeliveryBatchId:number){
    return await apiBearToken.get(`/order-delivery-batch/business/${orderDeliveryBatchId}/orders/list/?page=${page}`)
}

export const orderDeliveryBatchServices = {
    create,
    list,
    retrieve,
    update,
    delete:_delete,

    listOrders
}