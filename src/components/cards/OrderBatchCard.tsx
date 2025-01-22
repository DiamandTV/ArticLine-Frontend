import { OrderBatchModel } from "../../models/Order";

export function OrderBatchCard({orderBatch}:{orderBatch:OrderBatchModel}){

    return(
        <div>
            <h1>{orderBatch.id}</h1>
        </div>
    )
}