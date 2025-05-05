import { FormOperationInterface } from "@models/forms/FormOperationType"
import { Create } from "./StoreFormCreate"
import { Update } from "./StoreFormUpdate"

export const StoreForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return <Create/>
    },
    Update:()=>{
        return <Update/>
    }
}