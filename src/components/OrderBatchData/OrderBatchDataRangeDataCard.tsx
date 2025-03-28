import { BlurCard } from "../Cards/BlurCard";
import { AnimationDateTimeRangePicker } from "../inputs/DateTImeRangePicker/AnimationDateTimeRangePicker";
import { useContext } from "react";
import dayjs from "dayjs";
import { OrderBatchContext } from "../OrderCompanyBatch/OrderBatchContext/OrderBatchContext";
import { AnimationDateTimePickerProps } from "../inputs/DateTimePicker/AnimationDateTimePicker";
import { OrderContext } from "../OrderCompany/OrderContext/OrderContext";

function DataRangeDataCard({from,to}:{from:AnimationDateTimePickerProps,to:AnimationDateTimePickerProps}){
    //const {} = useFormContext()
    return(
        <BlurCard className="max-w-max">
            <AnimationDateTimeRangePicker
                from={from}
                to={to}
            />
        </BlurCard>
    )
}


export function OrderBatchDataRangeDataCard(){
    //const {} = useFormContext()
    const {orderBatch} = useContext(OrderBatchContext)
    return(
       <DataRangeDataCard 
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
    )
}

export function OrderBatchDataDataCard(){
    //const {} = useFormContext()
    const {order} = useContext(OrderContext)
    
    return(
       <DataRangeDataCard 
            from={{
                labelName:"START",
                name:"from_date_time",
                defaultValue:dayjs(order?.pickedup_time),
                constraints:{
                    minDateTime:dayjs(order!.pickedup_time),
                    maxDateTime:null
                }
            }}
            to={{
                labelName:"END",
                name:"to_date_time",
                defaultValue:dayjs(order?.delivered_time),
                constraints:{
                    minDateTime:null,
                    maxDateTime:order?.delivered_time ? dayjs(order?.delivered_time) : dayjs()
                }
            }}
       />
    )
}
