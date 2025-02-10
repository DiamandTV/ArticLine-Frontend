import { renderTimeViewClock } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { Controller, useFormContext } from "react-hook-form"
import DateRangePicker from '@mui/lab/DateRangePicker';

export interface AnimationDateTimeRangePickerProps{
    labelName:string,
    name:string,
    readonly?:boolean
    maxLength?:number,
    defaultValue?:Dayjs
}
export function AnimationDateTimeRangePicker({name,labelName,readonly,maxLength,defaultValue}:AnimationDateTimeRangePickerProps){
    const {control} = useFormContext()
    return(
        <Controller
            name={name}
            control={control}
            render={({field})=>(
                <DateRangePicker
                    defaultValue={defaultValue}
                    // slots={{
                    //     textField:(params)=><AnimationDatePickerInput
                    //                     labelName={labelName}
                    //                     type={type}
                    //                     name={name}
                    //                     readonly={readonly}
                    //                     maxLength={maxLength}
                    //                     params={params}
                    //                     error={error}
                    //                     />
                    //     }}
                    viewRenderers={{
                        hours:renderTimeViewClock,
                        minutes:renderTimeViewClock,
                        seconds:renderTimeViewClock
                    }}
                    {...field}
                />
            )}
            
        />
    )
}