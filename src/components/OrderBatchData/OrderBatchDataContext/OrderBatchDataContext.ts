import { createContext } from "react";
import { OrderBatchDataModel } from "../../../models/Order";
import { FIFOQueue } from "../../../utlis/moduls/fifo";
import { FIFO_QUEUE_SIZE } from "../../../constraints";

interface OrderBatchDataContextModel{
    orderBatchData:FIFOQueue<OrderBatchDataModel>,
    setOrderBatchData:React.Dispatch<React.SetStateAction<FIFOQueue<OrderBatchDataModel>>>

}

export const OrderBatchDataContext = createContext<OrderBatchDataContextModel>({
    orderBatchData:new FIFOQueue(FIFO_QUEUE_SIZE),
    setOrderBatchData:()=>{}
})