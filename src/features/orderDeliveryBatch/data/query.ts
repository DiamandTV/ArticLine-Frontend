import { HttpMethod } from "@models/Http/HttpMethods";

export const orderDeliveryBatchCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-order-delivery-batch',
    create:'create-order-delivery-batch',
    list:'list-order-delivery-batch',
    update:'update-order-delivery-batch',
    delete:'delete-order-delivery-batch',
}