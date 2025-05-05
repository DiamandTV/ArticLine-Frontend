import { FormOperationInterface } from "@models/forms/FormOperationType"
import {Create} from "./ProductFormCreate"
import { Update } from "./ProductFormUpdate"

export const ProductForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return <Create  />
    },
    Update:()=>{
        return <Update/>
    }
}