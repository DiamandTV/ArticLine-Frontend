import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";

interface DropdownProps {
    labelName:string,
    name:string,
    children:React.ReactNode,
    register?:UseFormRegisterReturn,
    error?:FieldError
}
export function Dropdown({labelName,name,register,children}:DropdownProps){
    // the state of the dropdown. true => if it's open , false => if it's closed 
    const [open,setOpen] = useState(false)
    const [focus,setFocus] = useState(false)
    return(
        <div className="relative flex flex-col w-full">
            <div 
                className="relative flex justify-between items-center h-10 w-full border-b-2 bg-transparent px-2 hover:cursor-pointer" 
                onClick={()=>setOpen(!open)}
                >
              <label
                    className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 hover:cursor-pointer ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <input 
                    className="focus:outline-none focus:border-blue-200 h-10 w-full bg-transparent px-2 text-lg"
                    id={name}
                    type={"text"} 
                    name={name} 
                   
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>{
                        
                        setOpen(false)
                    }}
                    {...register}  
                />
                <IoMdArrowDropdown 
                    size={25} 
                    className={`transitio-all duration-100 ease-in-out ${(open && focus) ? 'rotate-180' : 'rotate-0'}`}
                    />
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