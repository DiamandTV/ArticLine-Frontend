import { FormOperationInterface } from "@models/forms/FormOperationType";
import {Create} from "./StoreCategoryFormCreate"
import { Update } from "./StoreCategoryFormUpdat";
export const StoreCategoryForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return <Create/>
    },
    Update:()=><Update/>
}