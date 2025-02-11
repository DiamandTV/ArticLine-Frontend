import { AnimationDatePickerInput } from "./AnimationDatePickerInput";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Controller,useFormContext } from "react-hook-form";

export interface AnimationDatePickerProps{
    labelName:string,
    type?:string,
    name:string,
    readonly?:boolean
    maxLength?:number,
    constraints?:{
        minDate:unknown,
        maxDate:unknown
    }
}
export function AnimationDatePicker({labelName,type="text",name,maxLength,readonly=true,constraints/*register,error*/}:AnimationDatePickerProps){
    const { control } = useFormContext()
    return (
        <Controller name={name} control={control} render={({field,fieldState:{error}})=> <MobileDatePicker
            //defaultValue={dayjs(new Date())}
            minDate={constraints?.minDate}
            maxDate={constraints?.maxDate}
            slots={{
            textField:(params)=><AnimationDatePickerInput
                labelName={labelName}
                type={type}
                name={name}
                readonly={readonly}
                maxLength={maxLength}
                params={params}
                error={error}
                />
        }}
        {...field}
        
        
        />}/>
       
    )
}
