import { OrderBatchDataModel } from "../../../models/Order";
import { FIFOQueue } from "../../../utlis/moduls/fifo";
import { OrderBatchDataContext } from "./OrderBatchDataContext";

interface OrderBatchDataProviderProps{
    children:React.ReactNode
    orderBatchData:FIFOQueue<OrderBatchDataModel>,
    setOrderBatchData:React.Dispatch<React.SetStateAction<FIFOQueue<OrderBatchDataModel>>>   
}

export function OrderBatchDataProvider({children,orderBatchData,setOrderBatchData}:OrderBatchDataProviderProps){
    return(
        <OrderBatchDataContext.Provider value={{orderBatchData,setOrderBatchData}}>
            {children}
        </OrderBatchDataContext.Provider>
    )   
}