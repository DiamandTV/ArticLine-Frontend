import { OrderBatchDataModel } from "../../../models/Order";
import { OrderBatchDataContext } from "./OrderBatchDataContext";

interface OrderBatchDataProviderProps{
    children:React.ReactNode
    orderBatchData:OrderBatchDataModel[],
    setOrderBatchData:React.Dispatch<React.SetStateAction<OrderBatchDataModel[]>>   
}

export function OrderBatchDataProvider({children,orderBatchData,setOrderBatchData}:OrderBatchDataProviderProps){
    return(
        <OrderBatchDataContext.Provider value={{orderBatchData,setOrderBatchData}}>
            {children}
        </OrderBatchDataContext.Provider>
    )   
}