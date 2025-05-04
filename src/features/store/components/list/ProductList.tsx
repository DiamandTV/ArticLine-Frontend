import { ProductProvider } from "@features/store/context/ProductContext/ProductProvider"
import { useGetStoreCategoryProductQuery } from "@features/store/hooks/useGetStoreCategoryProductQuery/useGetStoreCategoryProductQuery"
import { useParams } from "react-router"
import { ProductCard } from "../cards/ProductCard/ProductCard"
import { useContext } from "react"
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BusinessStoreProductPage } from "@features/store/page/BusinessStore/BusinessStoreProductPage"

export function ProductList(){
    const params = useParams()
    const {setOpen} = useContext(BottomSheetModalContext)
    const {data,isLoading,isSuccess} = 
        useGetStoreCategoryProductQuery({
            storeId:Number(params['store-id']),
            storeCategoryId:Number(params['store-category-id'])
        })
    if(isLoading || !isSuccess) return null
    return(
        <div className="grid grid-cols-2 justify-center items-center gap-2">
            {
                data.map((product)=>{
                    return(
                        <ProductProvider product={product}>
                            <ProductCard 
                                onClick={()=>{
                                    
                                    setOpen(true)
                                }}
                            />
                            <SimpleBottomSheetModal detent="content-height" >
                                <BusinessStoreProductPage/>
                            </SimpleBottomSheetModal>
                        </ProductProvider>
                    )
                })
            }
        </div>
    )
}