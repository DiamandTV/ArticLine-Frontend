import { CategoryInterface } from "@features/home/model/Category/CategoryInterface";
import { categoryService } from "@features/home/services/categoryService";
import { useQuery } from "react-query";

const STALE_TIME = 900000 
const CACHE_TIME = 900000
export function useGetCategoryQuery(){
    const queryOptions = useQuery({
        queryKey:['fetch-list-categories'],
        queryFn:async()=>await categoryService.list(),
        staleTime:STALE_TIME,
        cacheTime:CACHE_TIME
    })

    if(queryOptions.isSuccess){
        return {...queryOptions,data:queryOptions?.data?.data as Array<CategoryInterface>}
    }
    return queryOptions
}