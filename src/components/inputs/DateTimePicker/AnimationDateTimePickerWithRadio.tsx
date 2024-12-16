import { Radio, useRadioGroup } from "@mui/material"
import { AnimationDateTimePicker } from "./AnimationDateTimePicker"
import { ORDER_MINUTES_OFFSET } from "../../../constraints"
import dayjs from "dayjs"

export function AnimationDateTimePickerWithRadio(){
    const radioGroup =useRadioGroup()
    return(
        <div className="w-full flex flex-row" >
            <Radio >
                <AnimationDateTimePicker
                    labelName={"DELIVERY TIME"}
                    type={"text"}
                    name="delivery_time"
                    defaultValue={dayjs().add(ORDER_MINUTES_OFFSET,'minutes')}
                />
            </Radio>
        </div>
    )
}