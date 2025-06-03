import { StoreCategoryProvider } from "@features/store/context/StoreCategoryContext/StoreCategoryProvider"
import { useGetStoreCategoryListQuery } from "@features/store/hooks/useGetStoreCategoryQuery/useGetStoreCategoryListQuery"
import {  StoreCategoryCard } from "../cards/StoreCategoryCard/StoreCategoryCard"
import { useNavigate, useParams } from "react-router"
import React, { useRef } from "react"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Chip } from "@components/Chip/Chip"
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider"
import { StoreCategory as _StoreCategory} from "../../compositions/StoreCategory"
import { getKey } from "@lib/kegGenerator/keyGenerator"
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider"
export function StoreCategory(){
    return null
}

type Props = React.HTMLAttributes<HTMLElement>;
StoreCategory.Grid = function Grid({...attr}:Props){
    const divRef = useRef<HTMLDivElement|null>(null)
    const params = useParams()
    const navigator = useNavigate()
    const paginationOptions = useGetStoreCategoryListQuery({
        companyId:Number(params['company-id']),
        storeId:Number(params['store-id'])
    })
    if(paginationOptions.isLoading || !paginationOptions.isSuccess) return
    const className = tailwindMerge("w-full h-max grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] mx-mb-df md:mx-df gap-2 ",attr.className)
    return(
        
            <div className="flex flex-row w-full h-full flex-nowrap">
                <div {...attr} className={className}>
                    <DivRefProvider divRef={divRef}>
                    <BottomSheetModalProvider>
                        <_StoreCategory.AddButton/>
                    </BottomSheetModalProvider>
                    {paginationOptions.data!.map((storeCategory)=>{
                        console.log(paginationOptions.data)
                        return(
                            <BottomSheetModalProvider key={storeCategory.id}>
                                
                                <StoreCategoryProvider key={getKey()} storeCategory={storeCategory}>
                                    <StoreCategoryCard 
                                        className="w-full h-max"
                                        onClick={(e)=>{
                                        e.stopPropagation()
                                        // navigate to the products page
                                        navigator(`/company/${storeCategory.store.company_profile}/store/${storeCategory.store.id}/category/${storeCategory.id}/`)
                                    }}/>
                                </StoreCategoryProvider>
                               
                            </BottomSheetModalProvider>                            
                        )
                    })}
                     </DivRefProvider>
                </div>
                <div ref={divRef} className=" w-max scrollbar-hide"></div>
            </div>
       
    )
}

StoreCategory.List = function List({...attr}:Props){
    const params = useParams()
    const navigator = useNavigate()
    const paginationOptions = useGetStoreCategoryListQuery({
        companyId:Number(params['company-id']),
        storeId:Number(params['store-id'])
    })
    if(paginationOptions.isLoading || !paginationOptions.isSuccess) return
    const className = tailwindMerge("w-full flex flex-row justify-start items-center gap-2 overflow-x-scroll scrollbar-hide ",attr.className)
    return(

            <BottomSheetModalProvider>
                <div {...attr} className={className}>
                    <_StoreCategory.AddButton className="p-1 text-xl w-max"/>
                    {paginationOptions.data!.map((storeCategory)=>{
                        return(
                            <>
                                <StoreCategoryProvider storeCategory={storeCategory}>
                                    <Chip 
                                        className={`flex-shrink-0 ${storeCategory}`} 
                                        onClick={()=>{
                                            navigator(`/business/store/${storeCategory.store.id}/${storeCategory.id}/`)
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
