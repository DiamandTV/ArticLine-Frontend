import { StoreCategoryProvider } from "@features/store/context/StoreCategoryContext/StoreCategoryProvider"
import { useGetStoreCategoryListQuery } from "@features/store/hooks/useGetStoreCategoryQuery/useGetStoreCategoryListQuery"
import { StoreCategoryAdd, StoreCategoryCard } from "../cards/StoreCategoryCard/StoreCategoryCard"
import { useNavigate, useParams } from "react-router"
import React from "react"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Chip } from "@components/Chip/Chip"
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider"

export function StoreCategory(){
    return null
}

type Props = React.HTMLAttributes<HTMLElement>;
StoreCategory.Grid = function Grid({...attr}:Props){
    const params = useParams()
    const navigator = useNavigate()
    const paginationOptions = useGetStoreCategoryListQuery({storeId:Number(params['store-id'])})
    if(paginationOptions.isLoading || !paginationOptions.isSuccess) return
    const className = tailwindMerge("grid grid-cols-3 px-2 gap-2 ",attr.className)
    return(
        <BottomSheetModalProvider>
            <div {...attr} className={className}>
                <StoreCategoryAdd/>
                {paginationOptions.data!.map((storeCategory)=>{
                    return(
                        <>
                            <StoreCategoryProvider storeCategory={storeCategory}>
                                <StoreCategoryCard onClick={()=>{
                                    // navigate to the products page
                                    navigator(`/store/${storeCategory.store}/category/${storeCategory.id}/`)
                                }}/>
                            </StoreCategoryProvider>
                        </>
                    )
                })}
            </div>
        </BottomSheetModalProvider>
    )
}

StoreCategory.List = function List({...attr}:Props){
    const params = useParams()
    const navigator = useNavigate()
    const paginationOptions = useGetStoreCategoryListQuery({storeId:Number(params['store-id'])})
    if(paginationOptions.isLoading || !paginationOptions.isSuccess) return
    const className = tailwindMerge("w-full flex flex-row justify-start items-center gap-2 overflow-x-scroll scrollbar-hide ",attr.className)
    return(
        <BottomSheetModalProvider>
            <div {...attr} className={className}>
                <StoreCategoryAdd className="w-max text-xl p-1"/>
                {paginationOptions.data!.map((storeCategory)=>{
                    return(
                        <>
                            <StoreCategoryProvider storeCategory={storeCategory}>
                                <Chip 
                                    className={`flex-shrink-0 ${storeCategory}`} 
                                    onClick={()=>{
                                        navigator(`/business/store/${storeCategory.store}/${storeCategory.id}/`)
                                    }}
                                >
                                    {storeCategory.name}
                                </Chip>
                            </StoreCategoryProvider>
                        </>
                    )
                })}
            </div>
        </BottomSheetModalProvider>
    )
}
