import { OrderBatchDataSEEView } from "../../router/OrderBatchDataSEEView"
import { OrderBatchDataFormProvider } from "../forms/provider/OrderBatchDataFormProvider"
import { OrderBatchSingleQuery } from "../OrderCompanyBatch/OrderBatchQuery/OrderBatchSingleQuery"
import { PaginationProvider } from "../Pagination/PaginationProvider"
import { PaginationButtonWithContext } from "../Pagination/PaginationRender"
import { OrderBatchData } from "./OrderBatchData"
import { OrderBatchDataQuery } from "./OrderBatchDataQuery/OrderBatchDataQuery"
import { OrderBatchDataRangeDataCard } from "./OrderBatchDataRangeDataCard"

interface OrderBatchDataViewProps{
    active:boolean
}
export function OrderBatchDataView({active}:OrderBatchDataViewProps){
    return(
        <OrderBatchSingleQuery>
            <PaginationProvider>
                <OrderBatchDataFormProvider>
                    <OrderBatchDataQuery>
                        {active &&  <OrderBatchDataSEEView/>}
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