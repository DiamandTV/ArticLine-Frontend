import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useEffect, useRef } from "react"
import { PaginationModel } from "../models/pagination"

interface usePaginationInfiniteScrollProps{
    queryKey:Array<string>,
    queryFn:QueryFunction
}

export function usePaginationInfiniteScroll({queryFn,queryKey}:usePaginationInfiniteScrollProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const  {data ,status,fetchNextPage,refetch} = useInfiniteQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:queryKey,
        queryFn:queryFn,
        initialPageParam:1,
        pagaParams:1,
        getNextPageParam:(lastPage:AxiosResponse)=>{
            const data = lastPage.data as PaginationModel
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
                            fetchNextPage()
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
    
    return {ref,status,refetch,data}
}