import { CACHE_TIME, STATE_TIME } from "@data/query";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { useQuery } from "react-query";

interface useGetBusinessStoreQuery{
    id:number
}
export function useGetBusinessStoreQuery({id}:useGetBusinessStoreQuery){
    const queryOptions = useQuery({
        queryKey:['business-fetch-store'],
        queryFn:async()=>await storeBusinessServices.retrieve(id),
        staleTime:STATE_TIME,
        cacheTime:CACHE_TIME
    })

    if(queryOptions.isSuccess){
        return {...queryOptions,data:queryOptions.data.data as StoreInterface}
    }

    return queryOptions
}