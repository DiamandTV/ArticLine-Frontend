import { OrderBatchDataView } from "../../components/OrderBatchData/OrderBatchDataView";

export function InActiveOrderBatchData(){
    return(
        <OrderBatchDataView active={false} />
    )
}