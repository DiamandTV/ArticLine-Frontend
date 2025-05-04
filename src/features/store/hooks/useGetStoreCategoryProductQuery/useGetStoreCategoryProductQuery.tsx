import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface"
import { storeBusinessProductServices } from "@features/store/services/storeBusinessProductService"
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll"
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse"

interface useGetStoreCategoryProductQueryProps{
    storeId?:number,
    storeCategoryId?:number
}
export function useGetStoreCategoryProductQuery({storeId,storeCategoryId}:useGetStoreCategoryProductQueryProps){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['fetch-store-category-product-list'],
        queryFn:async({pageParam})=>{
            console.log(storeId)
            console.log(storeCategoryId)
            if(storeId && storeCategoryId){
                console.log(storeId)
                console.log(storeCategoryId)
                
                return await storeBusinessProductServices.list(storeId,storeCategoryId,pageParam)
            }
            throw Error("Store ID or Store Category ID not provided")
        }
    })    
    if(paginationOptions.isSuccess){
       return {...paginationOptions,data:getDataFromPage<ProductInterface>(paginationOptions.data)}
    }
    return paginationOptions
}