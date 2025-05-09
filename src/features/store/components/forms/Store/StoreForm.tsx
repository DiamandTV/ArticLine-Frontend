import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType"
import { Create } from "./StoreFormCreate"
import { Update } from "./StoreFormUpdate"
import { Delete } from "./StoreFormDelete"
import { useParams } from "react-router"

export interface StoreFormProps{
    storeId?:number
}

function StoreParamsWrapper({operation,children}:FormOperationWrapperProps<StoreFormProps>){
    const params = useParams()
    const companyId = Number(params['company-id'])
    const storeId = Number(params['store-id'])
    switch(operation){
        case 'Create':
            if(companyId && storeId){
                return children({})
            }
            break
        case 'Update':
            if(companyId && storeId){
                return children({storeId})
            }
            break
        case 'Delete':
            if(companyId && storeId){
                return children({storeId})
            }
            break
    }
    throw new Error("Store Params Wrapper url has got WRONG params")
}

export const StoreForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return (
            <StoreParamsWrapper
                operation="Create"
            >
                {()=><Create/>}
            </StoreParamsWrapper>
        )
    },
    Update:()=>{
        return (
            <StoreParamsWrapper
                operation="Update"
            >
                {(param:StoreFormProps)=><Update {...param}/>}
            </StoreParamsWrapper>
        )
    },
    Delete:()=>{
        return(
            <StoreParamsWrapper
                operation="Delete"
            >
                {(params:StoreFormProps)=><Delete {...params}/>}
            </StoreParamsWrapper>
        )
    }
}