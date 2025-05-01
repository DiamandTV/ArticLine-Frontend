import { categoryService } from "@features/home/services/categoryService";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

const STALE_TIME = 900000 
const CACHE_TIME = 900000
export function useGetCategoryQuery(){
    const queryOptions = useQuery({
        queryKey:['fetch-list-categories'],
        queryFn:async()=>{
            return await categoryService.list()
        },
        staleTime:STALE_TIME,
        cacheTime:CACHE_TIME,

        refetchOnMount:false,
        refetchOnWindowFocus:false,

        retry:false,
    })

    if(queryOptions.isSuccess){
        const data = queryOptions.data as AxiosResponse|undefined
        return {...queryOptions,data:data?.data}
    }
    return queryOptions
}