import { OrderBatchDataFormProvider } from "../../components/forms/provider/OrderBatchDataFormProvider"
import { AnimationDateTimeRangePicker } from "../../components/inputs/DateTImeRangePicker/AnimationDateTimeRangePicker"
import { OrderBatchData } from "../../components/OrderBatchData/OrderBatchData"
import { OrderBatchDataQuery } from "../../components/OrderBatchData/OrderBatchDataQuery/OrderBatchDataQuery"

export function ActiveOrderBatchData(){
    return(
        <OrderBatchDataFormProvider>
            <OrderBatchDataQuery>
                <AnimationDateTimeRangePicker labelName="start" name="date_range" />
                <OrderBatchData/>
            </OrderBatchDataQuery>
        </OrderBatchDataFormProvider>
    )
}