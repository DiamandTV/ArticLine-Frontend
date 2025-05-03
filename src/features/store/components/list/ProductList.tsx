import { ProductProvider } from "@features/store/context/ProductContext/ProductProvider"
import { useGetStoreCategoryProductQuery } from "@features/store/hooks/useGetStoreCategoryProductQuery/useGetStoreCategoryProductQuery"
import { useParams } from "react-router"
import { ProductCard } from "../cards/ProductCard/ProductCard"

export function ProductList(){
    const params = useParams()
    const {data,isLoading,isSuccess} = 
        useGetStoreCategoryProductQuery({
            storeId:Number(params['store-id']),
            storeCategoryId:Number(params['store-category-id'])
        })
    if(isLoading || !isSuccess) return null
    alert(data.length)
    return(
        <div className="grid grid-cols-3 px-3 gap-2">
            {
                data.map((product)=>{
                    return(
                        <ProductProvider product={product}>
                            <ProductCard/>
                        </ProductProvider>
                    )
                })
            }
        </div>
    )
}