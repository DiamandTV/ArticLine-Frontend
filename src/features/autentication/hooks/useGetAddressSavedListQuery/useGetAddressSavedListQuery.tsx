import { addressCacheKey } from "@features/autentication/data/query";
import { AddressInterface } from "@features/autentication/models/Address/Interface/AddressInterface";
import { addressService } from "@features/autentication/services/addressService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

export function useGetAddressSavedListQuery(){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[addressCacheKey.list],
        queryFn:async()=>await addressService.list()
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<AddressInterface>(paginationResults.data)}
    }
    return paginationResults
}