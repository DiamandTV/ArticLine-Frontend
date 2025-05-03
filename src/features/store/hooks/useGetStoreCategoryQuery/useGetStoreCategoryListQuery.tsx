import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";
import { useParams } from "react-router";

export function useGetStoreCategoryListQuery(){
    const params = useParams()
    const storeId = params['store-id']
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['fetch-store-category-list'],
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