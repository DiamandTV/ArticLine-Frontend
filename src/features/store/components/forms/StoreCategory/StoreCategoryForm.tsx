import { FormOperationInterface } from "@models/forms/FormOperationType";
import {_Create} from "./StoreCategoryFormCreate"
export const StoreCategoryForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return <_Create/>
    },
    Update:()=><div></div>
}