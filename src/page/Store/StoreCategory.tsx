import { ProductPage } from "../../components/Store/ProductPage/ProductPage"
import { StoreCategoryQuery } from "../../components/Store/StoreCategory/StoreCategoryQuery"

export function StoreCategory(){
    return (
        <div className="w-full h-full flex flex-col gap-y-4">
            <StoreCategoryQuery>
                <ProductPage/>
            </StoreCategoryQuery>
        </div>
    )
}