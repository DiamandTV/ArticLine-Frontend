import { productCacheKey } from "@features/store/data/query"
import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface"
import { storeBusinessProductServices } from "@features/store/services/storeBusinessProductService"
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll"
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse"

interface useGetStoreCategoryProductQueryProps{
    companyId:number,
    storeId?:number,
    storeCategoryId?:number,
}
export function useGetStoreCategoryProductQuery({companyId,storeId,storeCategoryId}:useGetStoreCategoryProductQueryProps){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:[productCacheKey.list,storeId,storeCategoryId],
        queryFn:async({pageParam})=>{
            if(storeId && storeCategoryId){     
                return await storeBusinessProductServices.list(companyId,storeId,storeCategoryId,pageParam)
            }
            throw Error("Store ID or Store Category ID not provided")
        }
    })    
    if(paginationOptions.isSuccess){
       return {...paginationOptions,data:getDataFromPage<ProductInterface>(paginationOptions.data)}
    }
    return paginationOptions
}