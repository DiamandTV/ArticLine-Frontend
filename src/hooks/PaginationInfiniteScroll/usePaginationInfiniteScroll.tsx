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
        
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        //initialPageParam:1,
            
        getNextPageParam:(lastPage:AxiosResponse)=>{
            const data = lastPage.data as PaginationInterface
            if (!data) return 1
            if(data.next) return data.current_page_number + 1
            return undefined
        
        }
    })
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        if(entry.target == ref.current){
                            infinteResult.fetchNextPage()
                        }
                    }
                })
            },
            {
                //root:containerRef.current,
                rootMargin:'0px',
                threshold:0.001
            }
        )

        if(ref.current) {
            observer.observe(ref.current)
        }

        return ()=>{
            if(observer){
                observer.disconnect()
            }
        }
    
    },[])
    
    return {...infinteResult,ref}
}