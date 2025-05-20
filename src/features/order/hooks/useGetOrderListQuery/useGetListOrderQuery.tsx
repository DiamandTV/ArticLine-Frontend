import { orderCacheKey } from "@features/order/data/query";
import { OrderInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderServices } from "@features/order/services/orderServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

export function useGetOrderListQuery(){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[orderCacheKey.list],
        queryFn:async({pageParam})=>await orderServices.list(pageParam)
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<OrderInterface>(paginationResults.data)}
    }
    return paginationResults
}