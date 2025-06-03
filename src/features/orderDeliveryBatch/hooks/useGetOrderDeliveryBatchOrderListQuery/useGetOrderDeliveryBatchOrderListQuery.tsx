import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderDeliveryBatchCacheKey } from "@features/orderDeliveryBatch/data/query";
import { orderDeliveryBatchServices } from "@features/orderDeliveryBatch/services/orderDeliveyBatchServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetOrderDeliveryBatchOrderListQueryProps{
    orderDeliveryBatchId:number
}
export function useGetOrderDeliveryBatchOrderListQuery({orderDeliveryBatchId}:useGetOrderDeliveryBatchOrderListQueryProps){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[orderDeliveryBatchCacheKey.listOrders,orderDeliveryBatchId],
        queryFn:async({pageParam})=>await orderDeliveryBatchServices.listOrders(pageParam,orderDeliveryBatchId),
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<OrderBusinessInterface>(paginationResults.data)}
    }

    return paginationResults
}