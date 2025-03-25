import { BlurCard } from "../Cards/BlurCard";
import { AnimationDateTimeRangePicker } from "../inputs/DateTImeRangePicker/AnimationDateTimeRangePicker";
import { useContext } from "react";
import dayjs from "dayjs";
import { OrderBatchContext } from "../OrderCompanyBatch/OrderBatchContext/OrderBatchContext";

export function OrderBatchDataRangeDataCard(){
    //const {} = useFormContext()
    const {orderBatch} = useContext(OrderBatchContext)
    return(
        <BlurCard className="max-w-max">
            <AnimationDateTimeRangePicker
                from={{
                    labelName:"START",
                    name:"from_date_time",
                    constraints:{
                        minDateTime:dayjs(orderBatch?.pickedup_time),
                        maxDateTime:null
                    }
                }}
                to={{
                    labelName:"END",
                    name:"to_date_time",
                    defaultValue:dayjs(),
                    constraints:{
                        minDateTime:null,
                        maxDateTime:orderBatch?.finished_time ? dayjs(orderBatch?.finished_time) : dayjs()
                    }
                }}
            />
        </BlurCard>
    )
}