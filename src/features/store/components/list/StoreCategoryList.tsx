import { StoreCategoryProvider } from "@features/store/context/StoreCategoryContext/StoreCategoryProvider"
import { useGetStoreCategoryListQuery } from "@features/store/hooks/useGetStoreCategoryQuery/useGetStoreCategoryListQuery"
import { StoreCategoryAdd, StoreCategoryCard } from "../cards/StoreCategoryCard/StoreCategoryCard"
import { useNavigate } from "react-router"

export function StoreCategoryList(){
    const navigator = useNavigate()
    const {data,isLoading,isSuccess} = useGetStoreCategoryListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div className="grid grid-cols-3 px-3 gap-2">
            <StoreCategoryAdd/>
            {data.map((storeCategory)=>{
                return(
                    <>
                        <StoreCategoryProvider storeCategory={storeCategory}>
                            <StoreCategoryCard onClick={()=>{
                                // navigate to the products page
                                navigator(`${storeCategory.id}/`)
                            }}/>
                        </StoreCategoryProvider>
                    </>
                )
            })}
        </div>
    )
}