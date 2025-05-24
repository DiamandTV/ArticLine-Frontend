import { FormOperationInterface } from "@models/forms/FormOperationType";
import { Create } from "./Create";
import { Update } from "./Update";
import { Delete } from "./Delete";
import { UpdateDeliveryTime } from "./UpdateDeliveryTime";
import { Refuse } from "./Refuse";


interface OrderFormInterface<T> extends FormOperationInterface<T>{
    UpdateDeliveryTimeAndAccept:(props: T) => React.JSX.Element;
    Refuse:(props:T)=>React.JSX.Element
}

export const OrderForm:OrderFormInterface<unknown> = {
    Create:()=>{
        return <Create/>
    },
    Update:()=>{
        return <Update/>
    },
    Delete:()=>{
        return <Delete/>
    },

    UpdateDeliveryTimeAndAccept:()=>{
        return <UpdateDeliveryTime/>
    },
    Refuse:()=>{
        return <Refuse/>
    }

}