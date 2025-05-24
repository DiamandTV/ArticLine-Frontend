import { orderCacheKey } from "@features/order/data/query";
import { OrderInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderServices } from "@features/order/services/orderServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";
import { useSearchParams } from "react-router";

export function useGetOrderListQuery(){
    const [searchParams,] = useSearchParams()
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[orderCacheKey.list,...searchParams],
        queryFn:async({pageParam})=>await orderServices.list(pageParam,searchParams)
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<OrderInterface>(paginationResults.data)}
    }
    return paginationResults
}