import { OrderBatchDetailSEEView } from "../../router/OrderBatchDataSEEView";
import { OrderBatchDataFormProvider, OrderDataFormProvider } from "../forms/provider/OrderBatchDataFormProvider";
import { OrderSingleQuery } from "../Order/OrderQuery/OrderSingleQuery";
import { OrderBatchData } from "../OrderBatchData/OrderBatchData";
import { OrderDataQuery } from "../OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery";
import { OrderBatchDataDataCard } from "../OrderBatchData/OrderBatchDataRangeDataCard";
import { PaginationProvider } from "../Pagination/PaginationProvider";
import { PaginationButtonWithContext } from "../Pagination/PaginationRender";

export function OrderDataView({active}:{active:boolean}){
    return(
        <OrderSingleQuery>
            <PaginationProvider>
                <OrderDataFormProvider>
                    <OrderDataQuery>

                        {active &&  <OrderBatchDetailSEEView/>}
                        <div className="w-full  flex flex-col gap-y-2 justify-center">
                            <div className="w-full flex flex-col-reverse gap-2 justify-between items-center md:items-top md:flex-row">
                                <PaginationButtonWithContext/>
                                <OrderBatchDataDataCard/>
                            </div>
                            <OrderBatchData/>
                        </div>
                    
                    </OrderDataQuery>
                </OrderDataFormProvider>
            </PaginationProvider>
        </OrderSingleQuery>
    )
}
