import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { OrderResponseMapStatusType, OrderResponseType } from "@features/order/models/OrderResponse/OrderResponse";
import { decodeServerPayloadMsg } from "@utils/serverErrorDecode/errorDecode";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function serverErrorHandler(errors:AxiosError){
    const messages = decodeServerPayloadMsg(errors)
    if(messages.length > 0 ){
        messages.forEach((msg)=>{
            if(Object.keys(OrderResponseMapStatusType).includes(msg)){
                const code = msg as OrderResponseType
                switch(code) {
                    case 'DELIVERY-TIME-NOT-DECIDED':
                        toast(
                            <AlertCard
                                variant="danger"
                                title="⏰ Delivery time missing"
                                message="You need to select a delivery time before confirming the order. Please choose a delivery slot to proceed."
                            />,
                            {
                                className: "w-full",
                                position: "top-center",
                                hideProgressBar: true,
                            }
                        );
                        return;

                    case 'COMPANY-STATUS-STEP-RANGE-OUT':
                        toast(
                            <AlertCard
                                variant="danger"
                                title="🔒 Order not editable"
                                message="This order has reached a stage where it can no longer be modified by your company. Please contact support if you need further assistance."
                            />,
                            {
                                className: "w-full",
                                position: "top-center",
                                hideProgressBar: true,
                            }
                        );
                        return;
                    case 'DELAY-TIME-FREEZED':
                        toast(
                            <AlertCard
                                variant="danger"
                                title="🔒 Delay Time not editable"
                                message="This order has reached a stage where it's delaty time can no longer be modified by your company. Please contact support if you need further assistance."
                            />,
                            {
                                className: "w-full",
                                position: "top-center",
                                hideProgressBar: true,
                            }
                        );
                        return;

                }

            }
        })
    }
    return null
}