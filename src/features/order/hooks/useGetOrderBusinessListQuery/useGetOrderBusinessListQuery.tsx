import { orderBusinessCacheKey } from "@features/order/data/query"
import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface"
import { orderBusinessService } from "@features/order/services/orderBusinessServices"
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll"
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse"
import { useSearchParams } from "react-router"

export function useGetOrderBusinessListQuery(){
    const [searchParams] = useSearchParams()
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[orderBusinessCacheKey.list,...searchParams],
        queryFn:async({pageParam})=>await orderBusinessService.list(pageParam,searchParams)
    })
    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<OrderBusinessInterface>(paginationResults.data)}
    }
    return paginationResults
}