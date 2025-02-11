import { useFormContext } from "react-hook-form";
import { BlurCard } from "../Cards/BlurCard";
import { AnimationDateTimeRangePicker } from "../inputs/DateTImeRangePicker/AnimationDateTimeRangePicker";
import { useContext } from "react";
import dayjs from "dayjs";
import { OrderBatchDataContext } from "./OrderBatchDataContext/OrderBatchDataContext";

export function OrderBatchDataRangeDataCard(){
    //const {} = useFormContext()
    return(
        <BlurCard className="max-w-max">
            <AnimationDateTimeRangePicker
                from={{
                    labelName:"START",
                    name:"from_date_time",
                    
                }}
                to={{
                    labelName:"END",
                    name:"to_date_time"
                }}
            />
        </BlurCard>
    )
}