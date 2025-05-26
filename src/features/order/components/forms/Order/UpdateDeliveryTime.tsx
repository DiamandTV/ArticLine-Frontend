import { Button, Spinner } from "react-bootstrap";
import { OrderDeliverytimeInfoFields, OrderDeliveryTimeInfoFieldsProvider } from "../../fields/Order/OrderDeliveryTimeFields";
import { useMutation, useQueryClient } from "react-query";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { useFormContext } from "react-hook-form";
import { orderDeliveryTimeFieldsSchema, OrderDeliveryTimeFieldsType } from "@features/order/models/Order/Field/OrderField";
import { orderBusinessCacheKey } from "@features/order/data/query";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { serverErrorHandler } from "@features/order/utils/errorHandler/serverErrorHandler";

export function UpdateDeliveryTime(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <OrderDeliveryTimeInfoFieldsProvider>
                <OrderDeliverytimeInfoFields/>
                <UpdateButton/>
            </OrderDeliveryTimeInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(){
    const queryClient = useQueryClient()
    const {order} = useOrderContext()
    const {trigger,getValues,setError} = useFormContext<OrderDeliveryTimeFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderBusinessCacheKey.accept],
        mutationFn:async(orderDeliveryTimeInfo:OrderDeliveryTimeFieldsType)=>await orderBusinessService.accept(order.id,orderDeliveryTimeInfo),
        onSuccess:(data)=>{
            console.log(data)
            // todo : improve the state synchronizing with the server using setOrder instead of refetching entire page / list  
            queryClient.invalidateQueries([orderBusinessCacheKey.list])
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                // todo: handle server side accept error
                serverErrorHandler(error)
                setServerValidationErrors(error,setError,orderDeliveryTimeFieldsSchema.keyof().options)
            }
        }
    })

    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const orderDeliveryTimeInfo = getValues()
            await mutateAsync(orderDeliveryTimeInfo)
        }
    }

    return(
        <div className="w-full flex flex-row justify-between items-center gap-2">
            <Button
                className="w-full text-sm font-medium"
                disabled={isLoading}
                onClick={onClick}
            >
                {isLoading ? <Spinner/> : 'SET AND ACCEPT'}
            </Button>
        </div>
    )
}