import { AnimationDateTimePicker, AnimationDateTimePickerProps } from "../DateTimePicker/AnimationDateTimePicker"

export interface AnimationDateTimeRangePickerProps{
    from:AnimationDateTimePickerProps
    to:AnimationDateTimePickerProps
}

export function AnimationDateTimeRangePicker({from,to}:AnimationDateTimeRangePickerProps){
    return(
        <div className="max-w-max flex flex-row justify-center items-center gap-x-5">
            <AnimationDateTimePicker {...from}/>
            <AnimationDateTimePicker {...to}/>
        </div>
    )
}