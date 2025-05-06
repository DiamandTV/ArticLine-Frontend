import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType";
import {Create} from "./StoreCategoryFormCreate"
import { Update } from "./StoreCategoryFormUpdate";
import { useParams } from "react-router";
import { useContext } from "react";
import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext";
import { Delete } from "./StoreCategoryFormDelete";
export interface StoreCategoryFormProps extends React.HTMLAttributes<HTMLElement>{
    storeId:number,
    storeCategoryId?:number
}

function StoreCategoryParamsWrapper({operation,children}:FormOperationWrapperProps<StoreCategoryFormProps>){
    const params = useParams()
    const {storeCategory} = useContext(StoreCategoryContext)
    const storeId = Number(params['store-id'])
    const storeCategoryId = storeCategory?.id
    switch(operation){
        case 'Create':
            if(storeId){
                return children({storeId})
            }
            break
        case 'Update':
            if(storeId && storeCategoryId){
                return children({storeId,storeCategoryId})
            }
            break
        case 'Delete':
            if(storeId && storeCategoryId){
                return children({storeId,storeCategoryId})
            }
            break
    }
    // todo: handle the error
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