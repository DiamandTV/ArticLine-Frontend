import { useState } from "react"
import { CalendarIcon } from "@mui/x-date-pickers"
import { TextFieldProps } from "@mui/material"
import { InputError } from "../InputError/InputError"
import { FieldError } from "react-hook-form"
export interface AnimationDatePickerInputProps{
    labelName:string,
    type:string,
    name:string,
    readonly:boolean,
    maxLength?:number,
    params:TextFieldProps,
    error:FieldError | undefined
    // react form hook props
    //register?:UseFormRegisterReturn
    //error?:FieldError
}
export function AnimationDatePickerInput({labelName,type,name,maxLength,readonly,params,error/*register,error*/}:AnimationDatePickerInputProps){
    const [focus,setFocus] = useState(false)
    function onClickDatePickerInput (event:React.MouseEvent<HTMLDivElement, MouseEvent>){
        setFocus(true)
        params.onClick!(event)
    }
    
    return(
        <div className="relative flex flex-col w-full "  onClick={onClickDatePickerInput}>
            <div 
                className="relative flex justify-between items-center h-10 w-full px-0 hover:cursor-pointer" 
                
                >
               <label
                    className={`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${
                        focus || params.value
                            ? "translate-y-[-80%] translate-x-2 text-sm"
                            : "translate-y-0 translate-x-0 text-lg"
                    }`}
                    htmlFor={name}
                >
                    {labelName.toUpperCase()}
                </label>
                <div className="w-full grid grid-cols-[1fr,60px] justify-between items-center border-b-2 border-blue-200">
                    <input 
                         className="focus:outline-none focus:border-transparent border-transparent h-10 w-full border-b-2 bg-transparent px-2 text-lg"
                        id={name}
                        type={type} 
                        name={name} 
                        value={params.value as string}
                        maxLength={maxLength}
                        readOnly={readonly}
                        onFocus={()=>setFocus(true)}
                        onBlur={()=>params.value === "" ? setFocus(false) : setFocus(true)}
                        
                    />
                    <div className="flex flex-row items-start justify-end gap-2">
                        <CalendarIcon
                            className={`transitio-all duration-100 ease-in-out `}
                        />
                        
                        <InputError error={error}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}