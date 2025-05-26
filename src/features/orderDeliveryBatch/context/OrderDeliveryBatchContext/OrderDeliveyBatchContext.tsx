import { OrderDeliveryBatchInterface } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface";
import { createContext } from "react";

interface OrderDeliveryBatchContextInterface{
    orderDeliveryBatch:OrderDeliveryBatchInterface
}

export const OrderDeliveryBatchContext = createContext<Partial<OrderDeliveryBatchContextInterface>>({})