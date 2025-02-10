import { createContext } from "react";
import { OrderBatchDataModel } from "../../../models/Order";

interface OrderBatchDataContextModel{
    orderBatchData:OrderBatchDataModel[],
    setOrderBatchData:React.Dispatch<React.SetStateAction<OrderBatchDataModel[]>>

}

export const OrderBatchDataContext = createContext<OrderBatchDataContextModel>({
    orderBatchData:[],
    setOrderBatchData:()=>{}
})