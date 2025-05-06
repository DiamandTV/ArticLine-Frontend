import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType"
import {Create} from "./ProductFormCreate"
import { Update } from "./ProductFormUpdate"
import { useParams } from "react-router"
import { useContext } from "react"
import { ProductContext } from "@features/store/context/ProductContext/ProductContext"

export interface ProductFormProps {
    storeId:number,
    storeCategoryId:number,
    productId?:number
}

function ProductParamsWrapper({operation,children}:FormOperationWrapperProps<ProductFormProps>){
    const params = useParams()
    const {product} = useContext(ProductContext)
    const storeId = Number(params['store-id'])
    const storeCategoryId = Number(params['store-category-id'])
    const productId = product?.id
    switch(operation){
        case 'Create':
            if(storeId && storeCategoryId){
                return children({storeId,storeCategoryId,productId})
            }
            break
        case 'Update':
            if(storeId && storeCategoryId && productId){
                return children({storeId,storeCategoryId,productId})
            }
            break
    }
    return null
}


export const ProductForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return (
            <ProductParamsWrapper
                operation="Create"
            >   
                {(params:ProductFormProps)=><Create {...params}/>}
            </ProductParamsWrapper>
        )
    },
    Update:()=>{
        return (
            <ProductParamsWrapper
                operation="Update"
            >
                {(params:ProductFormProps)=><Update {...params} />}
            </ProductParamsWrapper>
        )
    }
}