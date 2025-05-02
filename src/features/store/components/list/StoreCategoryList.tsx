import { StoreCategoryProvider } from "@features/store/context/StoreCategoryContext/StoreCategoryProvider"
import { useGetStoreCategoryListQuery } from "@features/store/hooks/useGetStoreCategoryQuery/useGetStoreCategoryListQuery"
import { StoreCategoryAdd, StoreCategoryCard } from "../cards/StoreCategoryCard/StoreCategoryCard"

export function StoreCategoryList(){
    const {data,isLoading,isSuccess} = useGetStoreCategoryListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div className="grid grid-cols-3 px-3 gap-2">
            <StoreCategoryAdd/>
            {data.map((storeCategory)=>{
                return(
                    <>
                        <StoreCategoryProvider storeCategory={storeCategory}>
                            <StoreCategoryCard/>
                        </StoreCategoryProvider>
                    </>
                )
            })}
        </div>
    )
}