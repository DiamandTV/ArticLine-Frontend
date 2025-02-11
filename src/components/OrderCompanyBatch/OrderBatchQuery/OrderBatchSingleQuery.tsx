import { useState } from "react";
import { LoaderQuery } from "../../loader/LoaderWithQueryAndChildren";
import { OrderBatchModel } from "../../../models/Order";
import { useParams } from "react-router-dom";
import { useOrderBatchService } from "../../../services/orderBatchServices";
import { OrderBatchProvider } from "../OrderBatchContext/OrderBatchProvider";

export function OrderBatchSingleQuery({children,orderBatchId}:{children:React.ReactNode,orderBatchId?:string|number}){
    const params = useParams()
    const [orderBatch,setOrderBatch] = useState<OrderBatchModel|null>(null)
    if(!orderBatch){
        orderBatchId = params['order-batch-id']
    }
    if(!orderBatchId) return
    return(
        <LoaderQuery
            queryKey={['get-order-batch-detail',orderBatchId]}
            queryFn={async()=>useOrderBatchService.getOrderBatch({orderBatchId})}
            onSuccess={(data)=>{
                if(data.data){
                    setOrderBatch(data.data)
                }
            }}
            onError={()=>{

            }}
        >
            {
                orderBatch ?
                <OrderBatchProvider orderBatch={orderBatch!}>
                    {children}
                </OrderBatchProvider>
                : null    
            }
        </LoaderQuery>
    )
}