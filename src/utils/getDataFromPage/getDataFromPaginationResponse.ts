import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface"
import { AxiosResponse } from "axios"
import { InfiniteData } from "react-query"

export function getDataFromPage<T>(data?:InfiniteData<AxiosResponse<unknown, unknown>>){
    const dataArr:Array<T> = []
    data?.pages.map((page)=>{
        return (page.data as PaginationInterface).results?.map((res)=>{
            if(res){
                dataArr.push(res as T)
            }
        })
    })
    return dataArr
}