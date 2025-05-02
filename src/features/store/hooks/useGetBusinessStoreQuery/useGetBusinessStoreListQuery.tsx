import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

export function useGetBusinessStoreListQuery(){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['business-fetch-store-list'], // stores
        queryFn:async({pageParam})=>await storeBusinessServices.list(pageParam)
    })

    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreInterface>(paginationOptions.data)}
    }
    return paginationOptions
}