import { useState } from "react"
import { InputError } from "./InputError/InputError";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";
// Animtaion Placeholder Input Props
export interface AnimationPlaceholderInputProps {
    labelName:string,
    type:string,
    name:string,
    maxLength?:number,
    // react form hook props
    register?:UseFormRegisterReturn
    error?:FieldError | undefined
}
export function AnimationPlaceholderInput(
        {labelName,type,name,maxLength,register,error}:AnimationPlaceholderInputProps
    ){
        const [focus,setFocus] = useState(false)
        return (
            <div className="flex flex-col relative w-full">
                <label
                    className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <input 
                    {...register}
                    className="focus:outline-none focus:border-blue-200 h-10 w-full border-b-2 bg-transparent px-2 text-lg"
                    id={name}
                    type={type} 
                    name={name} 
                    maxLength={maxLength}
                    onFocus={()=>setFocus(true)}
                    onBlur={(e)=>{
                        setFocus(e.target.value == '' ? false : true)}
                    }  
                />
                <InputError error={error}/>
        </div>
        )
}