import { categoryService } from "@features/home/services/categoryService";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import { CategoryCard } from "../../cards/Category/CategoryCard";
import { CategoryProvider } from "@features/home/context/Category/CategoryProvider";
import { CategoryInterface } from "@features/home/model/Category/CategoryInterface";
import { getKey } from "@lib/kegGenerator/keyGenerator";

export function CategoryList(){
    const {ref,data} = usePaginationInfiniteScroll({
        queryKey:['articline-fetch-categories'],
        queryFn:async({pageParam})=>await categoryService.list(pageParam)
    })
    return(
        <div className="w-screen flex flex-row items-center gap-x-4 relative overflow-x-scroll scrollbar-hide">
            {data ? data!.pages.map((page)=>{
                return (page.data as PaginationInterface).results?.map((res)=>{
                    return(
                        <CategoryProvider key={getKey()} category={res as CategoryInterface}>
                            <CategoryCard />
                        </CategoryProvider>
                    )
                })
            }) : null}
            <div ref={ref} className="py-1 "></div>
        </div>  
    )
}