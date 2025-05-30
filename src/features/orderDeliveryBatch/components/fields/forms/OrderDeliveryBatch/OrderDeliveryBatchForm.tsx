import { FormOperationInterface } from "@models/forms/FormOperationType";
import { Create } from "./Create";
import { Update } from "./Update";
import { Delete } from "./Delete";

export const OrderDeliveryBatchForm:FormOperationInterface<unknown> = {
    Create:()=>{
        return <Create/>
    },
    Update:()=>{
        return <Update/>
    },
    Delete:()=>{
        return <Delete/>
    }
}