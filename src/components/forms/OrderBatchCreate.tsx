import { TextButton } from "../Buttons/TextButtons";
import { OrderBatchForm } from "./OrderBatchForm";

export function OrderBatchCreate(){
    return(
        <OrderBatchForm
            onSubmitForm={async(orderBatchInfo)=>{
                console.log(orderBatchInfo)
                // create the order batch
                return null
            }}
            >
            <TextButton
                type="submit"
                text="CREATE THE BATCH"
                onClick={()=>{

                }}
            />
        </OrderBatchForm>
    )
}