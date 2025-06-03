import { CACHE_TIME, STATE_TIME } from "@data/query"
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface"
import { AxiosResponse } from "axios"
import { useEffect, useRef } from "react"
import {  QueryFunction, useInfiniteQuery} from 'react-query'

interface usePaginationInfiniteScrollProps{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryKey:any[],
    queryFn: QueryFunction<AxiosResponse<unknown, unknown>, string[]>
}

export function usePaginationInfiniteScroll({queryFn,queryKey}:usePaginationInfiniteScrollProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const infinteResult = useInfiniteQuery({
        queryKey:queryKey,
        queryFn,
        
        staleTime:STATE_TIME,
        cacheTime:CACHE_TIME,

    
        refetchOnMount:true,
        refetchOnWindowFocus:false,
        //initialPageParam:1,
        getNextPageParam:(lastPage:AxiosResponse)=>{
            const data = lastPage.data as PaginationInterface
            
            if (!data) return 1
            if(data.next) {
                return data.current_page_number + 1
            }
            return undefined
        },
        onError:(error)=>{
            console.log(error)
        }
    })
   useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && entry.target === ref.current) { 
                    await infinteResult.fetchNextPage();
                }
            }
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    
    return {...infinteResult,ref}
}