import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType"
import {Create} from "./ProductFormCreate"
import { Update } from "./ProductFormUpdate"
import { useParams } from "react-router"
import { useContext } from "react"
import { ProductContext } from "@features/store/context/ProductContext/ProductContext"
import { Delete } from "./ProductFormDelete"

export interface ProductFormProps {
    storeId:number,
    storeCategoryId:number,
    productId?:number
}

function ProductParamsWrapper({operation,children}:FormOperationWrapperProps<ProductFormProps>){
    const params = useParams()
    const {product} = useContext(ProductContext)
    const companyId = Number(params['company-id'])
    const storeId = Number(params['store-id'])
    const storeCategoryId = Number(params['store-category-id'])
    const productId = product?.id
    switch(operation){
        case 'Create':
            if(companyId && storeId && storeCategoryId){
                return children({storeId,storeCategoryId,productId})
            }
            break
        case 'Update' :
            if(companyId && storeId && storeCategoryId && productId){
                return children({storeId,storeCategoryId,productId})
            }
            break
        case 'Delete':
            if(companyId && storeId && storeCategoryId && productId){
                return children({storeId,storeCategoryId,productId})
            }
            break
    }
    throw new Error("Product Params Wrapper url has got the WRONG params")
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
    },
    Delete:()=>{
        return(
            <ProductParamsWrapper
                operation="Delete"
            >
                {(params:ProductFormProps)=><Delete {...params}/>}
            </ProductParamsWrapper>
        )
    }
}