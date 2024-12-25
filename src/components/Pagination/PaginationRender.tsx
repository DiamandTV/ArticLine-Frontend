import { useContext } from "react";
import { PaginationContext } from "./PaginationContext";
import { Pagination, Stack } from "@mui/material";

/*
export function PaginationRender({children}:{children:React.ReactNode}){
    const  {pageData,setPage} = useContext(PaginationContext)
    return(
        <div className="w-full h-full">
            <Stack spacing={2}>
                <Pagination
                    page={pageData?.current_page_number}
                    count={pageData?.count}
                    onChange={(_,page)=>{
                        if(setPage){
                            setPage(page)
                        }
                    }}
                    renderItem={()=>{
                        return (
                            <div className="max-w-max max-h-max bg-white p-2 rounded-xl self-end justify-self-end sticky top-0">
                                <Stack spacing={2}>
                                    <Pagination count={count} shape="rounded" page={page} onChange={(_,page)=>onChange(page)}/>
                                </Stack>
                            </div>
                        )
                    }}
                />
            </Stack>
        </div>
    )
}
*/

export function PaginationButtonWithContext(){
    const {pageData,page,setPage} = useContext(PaginationContext)
    return(
        pageData && page && setPage && pageData.number_of_pages > 1 ?
        <div className="max-w-max max-h-max bg-white p-2 rounded-xl self-end justify-self-end sticky top-0">
            <Stack spacing={2}>
                <Pagination count={pageData.number_of_pages} shape="rounded" page={page} onChange={(_,page)=>setPage(page)}/>
            </Stack>
        </div> : null
    )
}