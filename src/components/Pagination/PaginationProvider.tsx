import { useState } from "react";
import { PaginationContext } from "./PaginationContext";
import { PaginationModel } from "../../models/pagination";

export function PaginationProvider({children}:{children:React.ReactNode}){
    const [pageData,setPageData] = useState<Omit<PaginationModel,'results'>>({
        count:0,
        next:"",
        previous:"",
        number_of_pages:0,
        current_page_number:0,
        page_size:0,
    })
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    return(
        <PaginationContext.Provider value={{pageData,setPageData,page,setPage,loading,setLoading}}>
            {children}
        </PaginationContext.Provider>
    )
}