import { createContext } from "react";
import { OrderBatchModel } from "../../../models/Order";

interface OrderBatchContexttModel{
    orderBatch:OrderBatchModel|null
}

export const OrderBatchContext = createContext<OrderBatchContexttModel>({
    orderBatch:null
})