import { createContext } from "react";
import { PaginationModel } from "../../models/pagination";

interface PaginationContextModel{
    pageData:Omit<PaginationModel,'results'>
    setPageData:(data:Omit<PaginationModel,'results'>)=>void,
    loading:boolean,
    setLoading:(state:boolean)=>void,
    page:number,
    setPage:(page:number)=>void,
}   

export const PaginationContext = createContext<Partial<PaginationContextModel>>({})