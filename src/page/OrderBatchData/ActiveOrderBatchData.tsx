import { OrderBatchDataFormProvider } from "../../components/forms/provider/OrderBatchDataFormProvider"
import { OrderBatchData } from "../../components/OrderBatchData/OrderBatchData"
import { OrderBatchDataQuery } from "../../components/OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery"
import { OrderBatchDataRangeDataCard } from "../../components/OrderBatchData/OrderBatchDataRangeDataCard"
import { OrderBatchSingleQuery } from "../../components/OrderCompanyBatch/OrderBatchQuery/OrderBatchSingleQuery"
import { PaginationContext } from "../../components/Pagination/PaginationContext"
import { PaginationProvider } from "../../components/Pagination/PaginationProvider"
import { PaginationButtonWithContext } from "../../components/Pagination/PaginationRender"

export function ActiveOrderBatchData(){
    return(
        <OrderBatchSingleQuery>
            <PaginationProvider>
                <OrderBatchDataFormProvider>
                    <OrderBatchDataQuery>
                        <div className="w-full h-full flex flex-col gap-y-2 justify-center">
                            <div className="w-full flex flex-row gap-x-2 justify-between items-top">
                                <PaginationButtonWithContext/>
                                <OrderBatchDataRangeDataCard/>
                            </div>
                            <OrderBatchData/>
                        </div>
                    </OrderBatchDataQuery>
                </OrderBatchDataFormProvider>
            </PaginationProvider>
        </OrderBatchSingleQuery>
    )
}