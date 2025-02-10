import { createContext } from "react";
import { OrderBatchModel } from "../../../models/Order";

interface OrderBatchContextModel{
    orderBatch:OrderBatchModel|null
}

export const OrderBatchContext = createContext<OrderBatchContextModel>({
    orderBatch:null
})