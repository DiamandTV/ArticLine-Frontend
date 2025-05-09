import { CACHE_TIME, STATE_TIME } from "@data/query";
import { storeCacheKey } from "@features/store/data/query";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { useQuery } from "react-query";

interface useGetBusinessStoreQuery{
    companyId:number,
    storeId:number
}
export function useGetBusinessStoreQuery({companyId,storeId}:useGetBusinessStoreQuery){
    const queryOptions = useQuery({
        queryKey:[storeCacheKey.retrieve],
        queryFn:async()=>await storeBusinessServices.retrieve(companyId,storeId),
        staleTime:STATE_TIME,
        cacheTime:CACHE_TIME
    })

    if(queryOptions.isSuccess){
        return {...queryOptions,data:queryOptions.data.data as StoreInterface}
    }

    return queryOptions
}