import { Button } from "react-bootstrap";
import { OrderDeliveryBatchInfoFields, OrderDeliveryBatchInfoFieldsProvider } from "../../OrderDeliveryBatch/OrderDeliveryBatchFields";
import { useFormContext } from "react-hook-form";
import { orderDeliveryBatchFieldsSchema, OrderDeliveryBatchFieldsType } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Field/OrderDeliveryBatchField";
export function Create(){
    return (
        <div className="w-full flex flex-col gap-2 " >
            <OrderDeliveryBatchInfoFieldsProvider>
                <OrderDeliveryBatchInfoFields/>
                <CreateButton/>
            </OrderDeliveryBatchInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const {trigger,getValues} = useFormContext<OrderDeliveryBatchFieldsType>()
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const orderDeliveryBatchInfo = orderDeliveryBatchFieldsSchema.parse(getValues())
            console.log(orderDeliveryBatchInfo)
        }
    }
    return(
        <Button
            className="text-sm font-medium"
            onClick={onClick}
        >
            CREATE
        </Button>
    )
}