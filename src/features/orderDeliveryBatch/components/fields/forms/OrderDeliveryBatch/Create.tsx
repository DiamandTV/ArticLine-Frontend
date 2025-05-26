import { Button } from "react-bootstrap";
import { OrderDeliveryBatchInfoFields, OrderDeliveryBatchInfoFieldsProvider } from "../../OrderDeliveryBatch/OrderDeliveryBatchFields";

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
    return(
        <Button>
            CREATE
        </Button>
    )
}