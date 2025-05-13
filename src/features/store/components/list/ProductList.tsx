import { ProductProvider } from "@features/store/context/ProductContext/ProductProvider"
import { useGetStoreCategoryProductQuery } from "@features/store/hooks/useGetStoreCategoryProductQuery/useGetStoreCategoryProductQuery"
import { useParams } from "react-router"
import { ProductCard } from "../cards/ProductCard/ProductCard"
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BusinessStoreProductPage } from "@features/store/page/BusinessStore/StoreProductPage"
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider"
import { Product } from "../../compositions/Product"

export function ProductList(){
    const params = useParams()
    const {data,isLoading,isSuccess} = 
        useGetStoreCategoryProductQuery({
            companyId:Number(params['company-id']),
            storeId:Number(params['store-id']),
            storeCategoryId:Number(params['store-category-id'])
        })
    if(isLoading || !isSuccess) return null
    return(
        <div className="w-full grid grid-cols-2 justify-center items-center gap-2">
            <BottomSheetModalProvider>
                <Product.BusinessAddButton/>
                </BottomSheetModalProvider>
                {
                    data.map((product)=>{
                        return(
                            <BottomSheetModalProvider>
                                <BottomSheetModalContext.Consumer >{({setOpen})=>{
                                    return(
                                        <ProductProvider product={product}>
                                            <ProductCard 
                                                onClick={()=>{
                                                    
                                                    setOpen(true)
                                                }}
                                            />
                                            <SimpleBottomSheetModal detent="content-height" className="relative z-50">
                                                <BusinessStoreProductPage/>
                                            </SimpleBottomSheetModal>
                                        </ProductProvider>
                                        )
                                    }}
                                </BottomSheetModalContext.Consumer>
                    </BottomSheetModalProvider>
                        
                    )
                })
            }
        </div>
    )
}