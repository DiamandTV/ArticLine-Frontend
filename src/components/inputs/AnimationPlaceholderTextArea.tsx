import {  useRef, useState } from "react"
import { InputError } from "./InputError/InputError";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";
// Animtaion Placeholder Input Props
export interface AnimationPlaceholderTextAreaProps {
    labelName:string,
    name:string,
    maxLength?:number,
    // react form hook props
    defaultValue?:string,
    register?:UseFormRegisterReturn
    error?:FieldError | undefined,
    onFocus?:()=>void,
    onBlur?:()=>void,
    className?:string
}
export function AnimationPlaceholderTextArea(
        {labelName,name,maxLength,defaultValue,register,error,className,onBlur,onFocus}:AnimationPlaceholderTextAreaProps
    ){
        const [focus,setFocus] = useState(defaultValue ? true : false );
        const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

        return (
            <div className="flex flex-col relative w-full">
                <label
                    className= {`select-none transition-all duration-100 ease-in-out relative z-10 top-10 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <div className="w-full flex flex-row justify-between items-center border-b-2 border-blue-200">
                    <textarea 
                        ref={textAreaRef}
                        
                        className={`change-icon-to-white focus:outline-none focus:border-transparent border-transparent h-10 w-full border-b-2 bg-transparent px-2 text-lg ${className}`}
                        id={name}
                        name={name} 
                        maxLength={maxLength}
                        onChange={(e)=>{
                            textAreaRef.current!.style.height = "0px";
                            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + 10 + "px"
                            register?.onChange(e)
                        }}
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
                    <InputError error={error}/>
                </div>
        </div>
        )
}