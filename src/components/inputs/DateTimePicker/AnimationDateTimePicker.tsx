import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Controller, useFormContext } from "react-hook-form";
import { AnimationDatePickerInput } from "../DatePicker/AnimationDatePickerInput";
import { Dayjs } from "dayjs";
export interface AnimationDateTimePickerProps{
    labelName:string,
    name:string,
    readonly?:boolean
    maxLength?:number,
    defaultValue?:Dayjs,
    constraints?:{
        minDateTime:unknown,
        maxDateTime:unknown
    }
}
export function AnimationDateTimePicker({labelName,name,readonly=false,maxLength,defaultValue,constraints}:AnimationDateTimePickerProps){
    const {control} = useFormContext()
    console.log()
    return(
        <Controller
            name={name}
            control={control}
            render={({field,fieldState:{error}})=>(
                <MobileDateTimePicker 
                    minDateTime={constraints?.minDateTime}
                    maxDateTime={constraints?.maxDateTime}
                    defaultValue={defaultValue}
                    slots={{
                        textField:(params)=><AnimationDatePickerInput
                                        labelName={labelName}
                                        type={"text"}
                                        name={name}
                                        readonly={readonly}
                                        maxLength={maxLength}
                                        params={params}
                                        error={error}
                                        />
                        }}
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