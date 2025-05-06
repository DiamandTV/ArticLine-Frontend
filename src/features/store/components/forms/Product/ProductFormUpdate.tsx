import { ProductContext } from "@features/store/context/ProductContext/ProductContext"
import { useContext } from "react"
import { ProductFields, ProductInfoFieldsProvider } from "../../fields/Product/ProductFields"
import { DefaultResetter } from "@components/forms/Resetter/DefaultResetter"
import { productInfoFieldsSchema, ProductInfoFieldsType } from "@features/store/model/Product/Fields/ProductFields"
import { productToFields } from "@features/store/utils/formTransformers/product/productTransformers"
import { ProductFormProps } from "./ProductForm"
import { useMutation } from "react-query"
import { storeBusinessProductServices } from "@features/store/services/storeBusinessProductService"
import { FormUpdateButton } from "@components/buttons/FormUpdateButton/FormUpdateButton"
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext"

export function Update(params:ProductFormProps){
    const {product} = useContext(ProductContext)
    if(!product) return null
    return(
        <div className="w-full flex flex-col gap-2 ">
            <ProductInfoFieldsProvider>
                <DefaultResetter<ProductInfoFieldsType> toFields={async()=>await productToFields(product)} />
                <ProductFields/>
                <UpdateButton {...params}/>
            </ProductInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(params:ProductFormProps){
    const {storeId,storeCategoryId,productId} = params
    const {setOpen} = useContext(BottomSheetModalContext)
    const mutationResults = useMutation({
        mutationKey:['update-product'],
        mutationFn:async(productInfo:ProductInfoFieldsType)=>{
            return await storeBusinessProductServices.update(Number(storeId),Number(storeCategoryId),productId!,productInfo)
        },
        onError:()=>{
            
            // if(err instanceof AxiosError){
            //     const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
            //     if(errorReponse && errorReponse?.type === 'validation_error'){
            //         const errors = errorReponse.errors
            //         errors.forEach((err)=>{
            //             const attr = err.attr as string                      
            //             setError(attr as keyof ProductInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
            //         })
            //     }
            // }
            
        },
        onSuccess:(data)=>{
            // todo:send to the list of pages
            console.log(data)
            setOpen(false)
        }
    })
    return(
        <FormUpdateButton<ProductInfoFieldsType>
            mutationResult={mutationResults}
            schema={productInfoFieldsSchema}
        />
    )
    
}