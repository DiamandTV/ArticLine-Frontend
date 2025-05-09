import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType";
import {Create} from "./StoreCategoryFormCreate"
import { Update } from "./StoreCategoryFormUpdate";
import { useParams } from "react-router";
import { Delete } from "./StoreCategoryFormDelete";
export interface StoreCategoryFormProps extends React.HTMLAttributes<HTMLElement>{
    storeId:number,
    storeCategoryId?:number
}

function StoreCategoryParamsWrapper({operation,children}:FormOperationWrapperProps<StoreCategoryFormProps>){
    const params = useParams()
    const companyId = Number(params['company-id'])
    const storeId = Number(params['store-id'])
    const storeCategoryId = Number(params['store-category-id'])
    switch(operation){
        case 'Create':
            if(companyId && storeId){
                return children({storeId})
            }
            break
        case 'Update':
            if(companyId && storeId && storeCategoryId){
                return children({storeId,storeCategoryId})
            }
            break
        case 'Delete':
            if(companyId && storeId && storeCategoryId){
                return children({storeId,storeCategoryId})
            }
            break
    }
    throw new Error("Store Category Params Wrapper has got WRONG params")
}

export const StoreCategoryForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return (
            <StoreCategoryParamsWrapper
                operation="Create"
            >
                {(params:StoreCategoryFormProps)=><Create {...params}/>}
            </StoreCategoryParamsWrapper>
        )
    },
    Update:()=>{
        return(
            <StoreCategoryParamsWrapper
                operation="Update"
            >
                {(params:StoreCategoryFormProps)=><Update {...params}/>}
            </StoreCategoryParamsWrapper>
        )
    },
    Delete:()=>{
        return(
            <StoreCategoryParamsWrapper
                operation="Delete"
            >
                {(params:StoreCategoryFormProps)=><Delete {...params}/>}
            </StoreCategoryParamsWrapper>
        )
    }
}