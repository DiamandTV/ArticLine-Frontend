import { apiBearToken } from "@lib/axios/api";
import { OrderDelayTimeFieldsType, OrderDeliveryTimeFieldsType } from "../models/Order/Field/OrderField";

async function list(page:number=1,searchParams:URLSearchParams){
    const params = searchParams ? `&${searchParams.toString()}` : ''
    return await apiBearToken.get(`/order/business/list/?page=${page}${params}`)
}

async function retrieve(orderId:number){
    return await apiBearToken.get(`/order/business/${orderId}/retrieve/`)
}

async function cancel(orderId:number){
    return await apiBearToken.patch(`/order/business/${orderId}/cancel/`,{})
}

async function refuse(orderId:number){
    return await apiBearToken.patch(`/order/business/${orderId}/refuse/`,{})
}

async function accept(orderId:number,orderDeliveryTimeInfo:OrderDeliveryTimeFieldsType) {
    return await apiBearToken.patch(`/order/business/${orderId}/accept/`,orderDeliveryTimeInfo)
}

async function nextStep(orderId:number){
    return await apiBearToken.patch(`/order/business/${orderId}/next-step/`,{})
}

async function updateDelayTime(orderId:number,orderDelayTimeInfo:OrderDelayTimeFieldsType){
    return await apiBearToken.patch(`/order/business/${orderId}/update/delay-time/`,orderDelayTimeInfo)
}

export const orderBusinessService = {
    list,
    retrieve,

    cancel,
    refuse,
    accept,
    nextStep,

    updateDelayTime
}
