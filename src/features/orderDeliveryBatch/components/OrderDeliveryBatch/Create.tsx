import { Button, Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { orderDeliveryBatchFieldsSchema, OrderDeliveryBatchFieldsType } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Field/OrderDeliveryBatchField";
import { useMutation } from "react-query";
import { orderDeliveryBatchCacheKey } from "@features/orderDeliveryBatch/data/query";
import { orderDeliveryBatchServices } from "@features/orderDeliveryBatch/services/orderDeliveyBatchServices";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { OrderDeliveryBatchInfoFields, OrderDeliveryBatchInfoFieldsProvider } from "../fields/OrderDeliveryBatch/OrderDeliveryBatchFields";
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
    const {trigger,getValues,setError} = useFormContext<OrderDeliveryBatchFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:orderDeliveryBatchCacheKey.create,
        mutationFn:async(orderDeliveryBatchInfo:OrderDeliveryBatchFieldsType)=>orderDeliveryBatchServices.create(orderDeliveryBatchInfo),
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                setServerValidationErrors(error,setError,orderDeliveryBatchFieldsSchema.keyof().options)
            }
        }
    
    })
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const orderDeliveryBatchInfo = orderDeliveryBatchFieldsSchema.parse(getValues())
            console.log(orderDeliveryBatchInfo)
            await mutateAsync(orderDeliveryBatchInfo)
        }
    }
    return(
        <Button
            className="text-sm font-medium"
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? <Spinner/> : 'CREATE'}
        </Button>
    )
}