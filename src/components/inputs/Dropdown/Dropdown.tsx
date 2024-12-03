import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";
import { InputError } from "../InputError/InputError";
interface DropdownProps {
    labelName:string,
    name:string,
    open:boolean,
    setOpen:(value:boolean)=>void,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    children:React.ReactNode,
    defaultValue?:string,
    register?:UseFormRegisterReturn,
    error?:FieldError
}
export function Dropdown({labelName,name,onChange,defaultValue,register,error,open,setOpen,children}:DropdownProps){

    const [focus,setFocus] = useState(defaultValue ? true : false)
    return(
        <div className="relative flex flex-col w-full">
            <div 
                className="relative flex justify-between items-center h-10 w-full border-b-2 bg-transparent px-2 hover:cursor-pointer" 
                
                >
              <label
                    className= {`select-none transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <div className="w-full flex flex-row justify-between items-center border-b-2 border-blue-200">
                <input 
                    {...register}  
                    className="focus:outline-none focus:border-transparent border-transparent h-10 w-full bg-transparent px-2 text-lg"
                    id={name}
                    type={"text"} 
                    name={name} 
                    onFocus={()=>{
                        setOpen(true)
                        setFocus(true)
                    }}
                    onBlur={(e)=>{
                        setFocus(e.target.value == '' ? false : true)
                        setOpen(false)
                    }} 
                    onChange={(event)=>{
                        onChange(event)
                        register?.onChange(event)
                    }}
                />
                <div className="flex flex-row items-start justify-end gap-2">
                    <IoMdArrowDropdown 
                        size={25} 
                        className={`transitio-all duration-100 ease-in-out ${(open && focus) ? 'rotate-180' : 'rotate-0'}`}
                        />
                    <InputError error={error}/>
                </div>
            </div>
            </div>
            {
                // Dropdown items
            }
            <div 
                className={`w-full max-h-32 absolute z-20 top-10 bg-slate-900 bg-opacity-85 backdrop-blur-lg rounded-b-lg pb-0.5 overflow-y-auto scrollbar-hide ${open ? 'visible' : 'invisible'}`}>
                {children}
            </div>
        </div>
    )
}