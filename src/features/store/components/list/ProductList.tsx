import { ProductProvider } from "@features/store/context/ProductContext/ProductProvider"
import { useGetStoreCategoryProductQuery } from "@features/store/hooks/useGetStoreCategoryProductQuery/useGetStoreCategoryProductQuery"
import { useParams } from "react-router"
import { ProductCard } from "../cards/ProductCard/ProductCard"
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BusinessStoreProductPage } from "@features/store/page/BusinessStore/StoreProductPage"
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider"
import { Product } from "../../compositions/Product"
import { useRef } from "react"
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider"

export function ProductList(){
    const params = useParams()
    const divRef = useRef<HTMLDivElement|null>(null)
    const {data,isLoading,isSuccess} = 
        useGetStoreCategoryProductQuery({
            companyId:Number(params['company-id']),
            storeId:Number(params['store-id']),
            storeCategoryId:Number(params['store-category-id'])
        })
    if(isLoading || !isSuccess) return null
    return(
        <div className="flex flex-row w-full h-full flex-nowrap ">
            <div className="w-full h-max grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
                <Product.BusinessAddButton/>
                {
                    data.map((product)=>{
                        return(
                            <DivRefProvider key={product.id} divRef={divRef}>
                                <BottomSheetModalProvider>
                                    <BottomSheetModalContext.Consumer >{({setOpen})=>{
                                        return(
                                            <ProductProvider product={product}>
                                                <ProductCard
                                                    className="h-full" 
                                                    onClick={()=>{
                                                        
                                                        setOpen(true)
                                                    }}
                                                />
                                                <SimpleBottomSheetModal detent="content-height" className="relative z-50">
                                                    <BusinessStoreProductPage />
                                                </SimpleBottomSheetModal>
                                            </ProductProvider>
                                            )
                                        }}
                                    </BottomSheetModalContext.Consumer>
                                </BottomSheetModalProvider>
                            </DivRefProvider>
                        
                    )
                    })
                }
            </div>
            <div ref={divRef} className="bg-transparent h-max scrollbar-hide"></div>
        </div>
    )
}