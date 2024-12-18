import {  useState } from "react"
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
    defaultValue?:string,
    register?:UseFormRegisterReturn
    error?:FieldError | undefined,
    onFocus?:()=>void,
    onBlur?:()=>void
}
export function AnimationPlaceholderInput(
        {labelName,type,name,maxLength,defaultValue,register,error,onBlur,onFocus}:AnimationPlaceholderInputProps
    ){
        const [focus,setFocus] = useState(defaultValue ? true : false );
    
        return (
            <div className="flex flex-col relative w-full">
                <label
                    className= {`select-none transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <div className="w-full flex flex-row justify-between items-center border-b-2 border-blue-200">
                    {register ?
                    <input 
                        {...register}
                        className="change-icon-to-white focus:outline-none focus:border-transparent border-transparent h-10 w-full border-b-2 bg-transparent px-2 text-lg"
                        id={name}
                        type={type} 
                        name={name} 
                        maxLength={maxLength}
                        onFocus={()=>{
                            setFocus(true)
                            if(onFocus != null) onFocus()
                        }}
                        onBlur={(e)=>{
                            setFocus(e.target.value == '' ? false : true)
                            if(onBlur != null) onBlur()
                            if(register?.onBlur != null) register.onBlur(e)
                            }
                        }  
                        
                    />
                    :
                    <input 
                        value={defaultValue}
                        className="change-icon-to-white focus:outline-none focus:border-transparent border-transparent h-10 w-full border-b-2 bg-transparent px-2 text-lg"
                        id={name}
                        type={type} 
                        name={name} 
                        maxLength={maxLength}
                        onFocus={()=>{
                            setFocus(true)
                            if(onFocus != null) onFocus()
                        }}
                        onBlur={(e)=>{
                            setFocus(e.target.value == '' ? false : true)
                            if(onBlur != null) onBlur()
                            //if(register && register!.onBlur != null) register.onBlur(e)
                            }
                        }  
                        
                    />    }
                    <InputError error={error}/>
                </div>
        </div>
        )
}