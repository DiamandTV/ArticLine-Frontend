/*
import { Controller, useFormContext } from "react-hook-form"
import { DateRange, DateRangePicker } from "mui-daterange-picker";
import { Dayjs } from "dayjs";

export interface AnimationDateRangePickerProps{
    labelName:string,
    name:string,
    readonly?:boolean
    maxLength?:number,
    defaultValue?:DateRange,
    className?:string
}

export function AnimationDateRangePicker({name,defaultValue,className=""}:AnimationDateRangePickerProps){
    const { control } = useFormContext()
    return (
        <Controller name={name} control={control} render={({field})=> <DateRangePicker
            wrapperClassName={className}
            initialDateRange={defaultValue}
            //defaultValue={dayjs(new Date())}
        //     slots={{
        //     textField:(params)=><AnimationDatePickerInput
        //         labelName={labelName}
        //         type={type}
        //         name={name}
        //         readonly={readonly}
        //         maxLength={maxLength}
        //         params={params}
        //         error={error}
        //         />
        // }}
        
            open
            toggle={()=>{}}
            {...field}
        
        
        />
    }/>
       
    )
}
    */