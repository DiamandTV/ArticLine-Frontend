import { OrderBatchData } from "../../components/OrderBatchData/OrderBatchData";
import { OrderBatchDataQuery } from "../../components/OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery";

export function InActiveOrderBatchData(){
    return(
        <OrderBatchDataQuery>
            <OrderBatchData/>
        </OrderBatchDataQuery>
    )
}