import { useState } from "react"
import { CalendarIcon } from "@mui/x-date-pickers"
import { TextFieldProps } from "@mui/material"
export interface AnimationDatePickerInputProps{
    labelName:string,
    type:string,
    name:string,
    readonly:boolean,
    maxLength?:number,
    params:TextFieldProps
    // react form hook props
    //register?:UseFormRegisterReturn
    //error?:FieldError
}
export function AnimationDatePickerInput({labelName,type,name,maxLength,readonly,params/*register,error*/}:AnimationDatePickerInputProps){
    const [focus,setFocus] = useState(false)
    function onClickDatePickerInput (event:React.MouseEvent<HTMLDivElement, MouseEvent>){
        setFocus(true)
        params.onClick!(event)
        
    }
    return(
        <div className="relative flex flex-col w-full "  onClick={onClickDatePickerInput}>
            <div 
                className="relative flex justify-between items-center h-10 w-full border-b-2 bg-transparent px-2 hover:cursor-pointer" 
                
                >
              <label
                    className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <input 
                    className="focus:outline-none focus:border-blue-200 h-10 w-full bg-transparent px-2 text-lg"
                    id={name}
                    type={type} 
                    name={name} 
                    value={params.value as string}
                    maxLength={maxLength}
                    readOnly={readonly}
                />
                <CalendarIcon
                    className={`transitio-all duration-100 ease-in-out `}
                    />
            </div>
        </div>
    )
}