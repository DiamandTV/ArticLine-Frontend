import { OrderBatchData } from "../../components/OrderBatchData/OrderBatchData"
import { OrderBatchDataQuery } from "../../components/OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery"

export function ActiveOrderBatchData(){
    return(
        <OrderBatchDataQuery>
            <OrderBatchData/>
        </OrderBatchDataQuery>
    )
}