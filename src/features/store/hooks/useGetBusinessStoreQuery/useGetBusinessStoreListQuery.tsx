import { storeCacheKey } from "@features/store/data/query";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetBusinessStoreListQueryProps{
    companyId:number
}
export function useGetBusinessStoreListQuery({companyId}:useGetBusinessStoreListQueryProps){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:[storeCacheKey.list], // stores
        queryFn:async({pageParam})=>await storeBusinessServices.list(companyId,pageParam)
    })

    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreInterface>(paginationOptions.data)}
    }
    return paginationOptions
}