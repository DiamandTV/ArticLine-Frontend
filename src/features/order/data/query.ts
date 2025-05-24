import { HttpMethod } from "@models/Http/HttpMethods";

export const orderCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-order',
    create:'create-order',
    list:'list-order',
    update:'update-order',
    delete:'delete-order',
}

type OrderBusinessCacheKey = HttpMethod | 'cancel' | 'refuse' | 'nextStep' | 'accept'
export const orderBusinessCacheKey:Record<OrderBusinessCacheKey,string> = {
    retrieve:'retrieve-order-business',
    create:'create-order-business',
    list:'list-order-business',
    update:'update-order-business',
    delete:'delete-order-business',

    cancel:'cancel-order-business',
    refuse:'refuse-order-business',
    accept:'accept-order-business',
    nextStep:'nextStep-order-business'
}