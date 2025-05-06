import { FormOperationInterface, FormOperationWrapperProps } from "@models/forms/FormOperationType"
import { Create } from "./StoreFormCreate"
import { Update } from "./StoreFormUpdate"
import { useContext } from "react"
import { StoreContext } from "@features/store/context/StoreContext/StoreContext"

export interface StoreFormProps{
    storeId?:number
}

function StoreParamsWrapper({operation,children}:FormOperationWrapperProps<StoreFormProps>){
    const {store} = useContext(StoreContext)
    const storeId = store?.id
    switch(operation){
        case 'Create':
            return children({})
            //break
        case 'Update':
            if(storeId){
                return children({storeId})
            }
            break
    }
    // todo: handle the error
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
    }
}