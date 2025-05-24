import { Button, Spinner } from "react-bootstrap";
import { OrderDeliverytimeInfoFields, OrderDeliveryTimeInfoFieldsProvider } from "../../fields/Order/OrderDeliveryTimeFields";
import { useMutation } from "react-query";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { useFormContext } from "react-hook-form";
import { OrderDeliveryTimeFieldsType } from "@features/order/models/Order/Field/OrderField";
import { orderBusinessCacheKey } from "@features/order/data/query";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";

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

export function UpdateButton(){
    const {order} = useOrderContext()
    const {trigger,getValues} = useFormContext<OrderDeliveryTimeFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderBusinessCacheKey.accept],
        mutationFn:async(orderDeliveryTimeInfo:OrderDeliveryTimeFieldsType)=>await orderBusinessService.accept(order.id,orderDeliveryTimeInfo)
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