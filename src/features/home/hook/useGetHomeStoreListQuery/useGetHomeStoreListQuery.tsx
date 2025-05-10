import { homeService } from "@features/home/services/homeService";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

export function useStoreHomeStoreListQuery(){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['list-home-store-list'],
        queryFn:async({pageParam})=>{
            return await homeService.list(pageParam)
        }
    })
    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreInterface>(paginationOptions.data)}
    }
    return paginationOptions
}