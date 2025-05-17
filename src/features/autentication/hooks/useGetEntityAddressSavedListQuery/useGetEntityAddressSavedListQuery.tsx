import { entityAddressCacheKey } from "@features/autentication/data/query";
import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";
import { entityAddressService } from "@features/autentication/services/entityAddressService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

export function useGetEntityAddressSavedListQuery(){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[entityAddressCacheKey.list],
        queryFn:async()=>await entityAddressService.list()
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<EntityAddressInterface>(paginationResults.data)}
    }
    return paginationResults
}