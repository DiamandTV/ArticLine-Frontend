import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export interface AnimationDatePickerProps{
    labelName:string
}
export function AnimationDatePicker({labelName}:AnimationDatePickerProps){
    const [focus,setFocus] = useState(false)
    return (
        /*
        <div className="flex flex-col relative w-full">
             <label
                    className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`}>
                    {labelName.toUpperCase()}
            </label>
            <div className="flex justify-end items-center focus:outline-none focus:border-blue-200 h-10 w-full border-b-2 bg-transparent px-2 text-lg hover:cursor-pointer"
                
                onClick={()=>setFocus(true)}
            >
                <CalendarTodayIcon />
            </div>
            <DatePicker
                open={focus} 
                slotProps={{
                    textField: { variant: "standard", style: { display: "none" } }, // Hide default text field
                    toolbar: { hidden: true },
                  }}
                 />
        </div>
        */
        <DatePicker 
            
         />
    )
}
