import { FormOperationInterface } from "@models/forms/FormOperationType";
import { Create } from "./Create";
import { Update } from "./Update";
import { Delete } from "./Delete";
import { JSX } from "react"
import { OrderListForm } from "./OrderListForm";

interface OrderDeliveryBatchFormInterface<T> extends FormOperationInterface<T> {
    OrderList:(props:T)=>JSX.Element
}
export const OrderDeliveryBatchForm:OrderDeliveryBatchFormInterface<unknown> = {
    Create:()=>{
        return <Create/>
    },
    Update:()=>{
        return <Update/>
    },
    Delete:()=>{
        return <Delete/>
    },
    OrderList:()=>{
        return <OrderListForm/>
    }
}