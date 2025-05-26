import { Button, Spinner } from "react-bootstrap";
import { OrderDelaytimeInfoFields, OrderDelayTimeInfoFieldsProvider } from "../../fields/Order/OrderDelayTimeFields";
import { useFormContext } from "react-hook-form";
import { orderDelayTimeFieldsSchema, OrderDelayTimeFieldsType } from "@features/order/models/Order/Field/OrderField";
import { useMutation } from "react-query";
import { orderBusinessCacheKey } from "@features/order/data/query";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";

export function UpdateDelayTime(){
    return (
        <div className="w-full flex flex-col gap-2 ">
            <OrderDelayTimeInfoFieldsProvider>
                <OrderDelaytimeInfoFields/>
                <UpdateButton/>
            </OrderDelayTimeInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(){
    const {order} = useOrderContext()
    const {trigger,getValues,setError} = useFormContext<OrderDelayTimeFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderBusinessCacheKey.updateDelayTime],
        mutationFn:async(orderDelayTimeInfo:OrderDelayTimeFieldsType)=>orderBusinessService.updateDelayTime(order.id,orderDelayTimeInfo),
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                setServerValidationErrors(error,setError,orderDelayTimeFieldsSchema.keyof().options)
            }
        }
    })
    const onClick = async ()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const orderDeliveryTimeInfo = orderDelayTimeFieldsSchema.parse(getValues())
            console.log(orderDeliveryTimeInfo)
            await mutateAsync(orderDeliveryTimeInfo)
        }
    }
    return(
        <Button
            className="text-sm font-medium"
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? <Spinner/> : 'SET DELAY TIME'}
        </Button>
    )
}