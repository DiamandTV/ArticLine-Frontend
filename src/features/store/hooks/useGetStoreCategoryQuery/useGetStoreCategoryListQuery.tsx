import { storeCategoryCacheKey } from "@features/store/data/query";
import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetStoreCategoryListQueryProps{
    companyId:number
    storeId?:number
}
export function useGetStoreCategoryListQuery({companyId,storeId}:useGetStoreCategoryListQueryProps){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:[storeCategoryCacheKey.delete,storeId],
        queryFn:async({pageParam})=>{
            if(storeId ){
               return await storeBusinessCategoryServices.list(companyId,storeId,pageParam)
            }
            throw Error("Store ID not provided")

        }
    }) 

    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreCategoryInterface>(paginationOptions.data)}
    }

    return paginationOptions
}
