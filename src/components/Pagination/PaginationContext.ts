import { createContext } from "react";
import { PaginationModel } from "../../models/pagination";


interface PaginationContextModel{
    page:number,
    setPage:(page:number)=>void,
    page_size:number|undefined,
    setPageSize:(page_size:number)=>void,
    loading:boolean,
    setLoading:(state:boolean)=>void,
    pageData:Omit<PaginationModel,'results'>
    setPageData:(data:Omit<PaginationModel,'results'>)=>void,
    
}   

export const PaginationContext = createContext<Partial<PaginationContextModel>>({})