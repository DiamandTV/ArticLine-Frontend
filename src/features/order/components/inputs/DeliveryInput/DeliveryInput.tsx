import { useFormContext } from "react-hook-form";
import { DeliveryTimeInput } from "./DeliveryTimeInput";
import { DeliveryTimeRadio } from "./DeliveryTimeTypeRadio";

export function DeliveryInput(){
    const {watch} = useFormContext()
    return(
        <>
            <DeliveryTimeRadio id="request_earliest_delivery"/>
            
            <div className={`${watch('request_earliest_delivery') ? 'hidden' : 'relative'}`}>
                <DeliveryTimeInput id="delivery_time" label="DELIVERY TIME"/>
            </div>
        </>
    )
}