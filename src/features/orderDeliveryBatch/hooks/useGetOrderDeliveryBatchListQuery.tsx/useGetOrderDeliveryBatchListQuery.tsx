import { orderDeliveryBatchCacheKey } from "@features/orderDeliveryBatch/data/query"
import { OrderDeliveryBatchInterface } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface"
import { orderDeliveryBatchServices } from "@features/orderDeliveryBatch/services/orderDeliveyBatchServices"
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll"
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse"
import { useSearchParams } from "react-router"

export function useGetOrderDeliveryBatchListQuery(){
    const [searchParams] = useSearchParams()
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[orderDeliveryBatchCacheKey.list,...searchParams],
        queryFn:async({pageParam})=>await orderDeliveryBatchServices.list(pageParam,searchParams)
    })
    
    if(paginationResults.isFetched || paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<OrderDeliveryBatchInterface>(paginationResults.data)}
    }

    return paginationResults
}