import { OrderDeliveryBatchInterface } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface";
import { OrderDeliveryBatchContext } from "./OrderDeliveyBatchContext";
import { useContext } from "react";

interface OrderDeliveryBatchProviderProps{
    children:React.ReactNode,
    orderDeliveryBatch:OrderDeliveryBatchInterface
}
export function OrderDeliveryBatchProvider({children,orderDeliveryBatch}:OrderDeliveryBatchProviderProps){
    return(
        <OrderDeliveryBatchContext.Provider value={{orderDeliveryBatch}}>
            {children}
        </OrderDeliveryBatchContext.Provider>
    )
}

export function useOrderDeliveryBatchContext(){
    const context = useContext(OrderDeliveryBatchContext)
    if(context){
        return {...context,orderDeliveryBatch:context.orderDeliveryBatch!}
    }
    throw new Error("useOrderDeliveryBatch can only be used within OrderDeliveryBatchProvider")
}
