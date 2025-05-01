import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import { AxiosResponse } from "axios";
import { InfiniteData } from "react-query";


function getDataFromPage<T>(data:InfiniteData<AxiosResponse<unknown, unknown>>){
    const dataArr:Array<T> = []
    data.pages.map((page)=>{
        return (page.data as PaginationInterface).results?.map((res)=>{
            if(res){
                dataArr.push(res as T)
            }
        })
    })
    return dataArr
}

export function useGetBusinessStoreQuery(){
    const paginationOptions = usePaginationInfiniteScroll({
        queryKey:['business-fetch-store'], // stores
        queryFn:async({pageParam})=>await storeBusinessServices.list(pageParam)
    })

    if(paginationOptions.isSuccess){
        return {...paginationOptions,data:getDataFromPage<StoreInterface>(paginationOptions.data)}
    }
    return paginationOptions
}