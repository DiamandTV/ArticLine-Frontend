import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AnimationDateTimePicker } from "../DateTimePicker/AnimationDateTimePicker";
import dayjs from "dayjs";
import { ORDER_MINUTES_OFFSET } from "../../../constraints";
import { Controller, useFormContext } from "react-hook-form";
export function OrderTimeInput(){
    const {control} = useFormContext()

    return(
        <Controller
            control={control}
            defaultValue={true}
            name="request_earliest_delivery"
            render={({field})=>(
                <RadioGroup  {...field}>
                    <div className="w-full h-full flex flex-col gap-y-6 col-span-2">
                        <FormControlLabel 
                            control={<Radio />} 
                            name="first" 
                            value={true}
                            label={(
                                <div>
                                    <h1>IL PRIMA POSSIBILE</h1>
                                </div>
                            )}/>
                        <FormControlLabel control={<Radio />} name="second" value={false} label={(
                            <AnimationDateTimePicker
                                labelName={"DELIVERY TIME"}
                                type={"text"}
                                name="delivery_time"
                                defaultValue={dayjs().add(ORDER_MINUTES_OFFSET,'minutes')}
                            />
                        )} />
                    </div>
                </RadioGroup>
            )}
        />
    )

}