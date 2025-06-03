import { HttpMethod } from "@models/Http/HttpMethods";

type OrderDeliveryBatchCacheKeyType = HttpMethod | 'listOrders' | 'addOrder' | 'removeOrder'
export const orderDeliveryBatchCacheKey:Record<OrderDeliveryBatchCacheKeyType,string> = {
    retrieve:'retrieve-order-delivery-batch',
    create:'create-order-delivery-batch',
    list:'list-order-delivery-batch',
    update:'update-order-delivery-batch',
    delete:'delete-order-delivery-batch',
    
    // list order delivery batch orders
    listOrders:'list-order-delivery-batch-orders',
    addOrder:'add-order-order-delivery-batch',
    removeOrder:'remove-order-order-delivery-batch'
}