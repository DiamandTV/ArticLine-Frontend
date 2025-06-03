import { useFormContext } from "react-hook-form";
import { DeliveryTimeInput } from "./DeliveryTimeInput";
import { DeliveryTimeRadio } from "./DeliveryTimeTypeRadio";
import { OrderInfoFieldsType } from "@features/order/models/Order/Field/OrderField";

export function DeliveryInput(){
    const {watch} = useFormContext<OrderInfoFieldsType>()
    return(
        <div className="flex flex-col gap-2">  
            <h1 className="pb-2 font-medium">DELIVERY TYPE</h1>
                <DeliveryTimeRadio id="request_earliest_delivery"/>
                
                <div className={`${watch('request_earliest_delivery') ? 'hidden' : 'relative'}`}>
                    <DeliveryTimeInput id="delivery_time" label="DELIVERY TIME"/>
                </div>
        </div>
    )
}