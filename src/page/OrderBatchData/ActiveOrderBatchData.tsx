import { OrderBatchDataFormProvider } from "../../components/forms/provider/OrderBatchDataFormProvider"
import { OrderBatchData } from "../../components/OrderBatchData/OrderBatchData"
import { OrderBatchDataQuery } from "../../components/OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery"
import { OrderBatchDataRangeDataCard } from "../../components/OrderBatchData/OrderBatchDataRangeDataCard"
import { OrderBatchSingleQuery } from "../../components/OrderCompanyBatch/OrderBatchQuery/OrderBatchSingleQuery"

export function ActiveOrderBatchData(){
    return(
        <OrderBatchSingleQuery>
            <OrderBatchDataFormProvider>
                <OrderBatchDataQuery>
                    <div className="w-full h-full flex flex-col gap-y-2 justify-center items-end">
                        <OrderBatchDataRangeDataCard/>
                        <OrderBatchData/>
                    </div>
                </OrderBatchDataQuery>
            </OrderBatchDataFormProvider>
        </OrderBatchSingleQuery>
    )
}