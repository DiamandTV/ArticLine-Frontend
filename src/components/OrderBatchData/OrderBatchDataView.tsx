import { OrderBatchDetailSEEView } from "../../router/OrderBatchDataSEEView"
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
                        {active &&  <OrderBatchDetailSEEView/>}
                        <div className="w-full  flex flex-col gap-y-2 justify-center">
                            <div className="w-full flex flex-col-reverse gap-2 justify-between items-center md:items-top md:flex-row">
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