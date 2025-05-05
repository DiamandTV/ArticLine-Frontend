import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetStoreCategoryListQueryProps{
    storeId?:number
}
export function useGetStoreCategoryListQuery({storeId}:useGetStoreCategoryListQueryProps){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['fetch-store-category-list',storeId],
        queryFn:async({pageParam})=>{
            if(storeId ){
               return await storeBusinessCategoryServices.list(Number(storeId),pageParam)
            }
            throw Error("Store ID not provided")

        }
    }) 

    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreCategoryInterface>(paginationOptions.data)}
    }

    return paginationOptions
}
