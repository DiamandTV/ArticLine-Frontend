import { OrderBatchModel } from "../../../models/Order";
import { OrderBatchContext } from "./OrderBatchContext";

export function OrderBatchProvider({orderBatch,children}:{orderBatch:OrderBatchModel,children:React.ReactNode}){
    return (
        <OrderBatchContext.Provider value={{orderBatch:orderBatch}}>
            {children}
        </OrderBatchContext.Provider>
    )
}