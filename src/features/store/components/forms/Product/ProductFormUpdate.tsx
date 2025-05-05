import { ProductContext } from "@features/store/context/ProductContext/ProductContext"
import { useContext } from "react"
import { ProductFields, ProductInfoFieldsProvider } from "../../fields/Product/ProductFields"
import { DefaultResetter } from "@components/forms/Updater/DefaultResetter"
import { ProductInfoFieldsType } from "@features/store/model/Product/Fields/ProductFields"
import { productToFields } from "@features/store/utils/formTransformers/product/productTransformers"

export function Update(){
    const {product} = useContext(ProductContext)
    if(!product) return
    return(
        <div className="w-full flex flex-col gap-2 ">
            <ProductInfoFieldsProvider>
                <DefaultResetter<ProductInfoFieldsType> toFields={async()=>await productToFields(product)} />
                <ProductFields/>
            </ProductInfoFieldsProvider>
        </div>
    )
}