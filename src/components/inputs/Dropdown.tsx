import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface DropdownProps {
    labelName:string
}
export function Dropdown(){
    // the state of the dropdown. true => if it's open , false => if it's closed 
    const [open,setOpen] = useState(false)
    return(
        <div className="relative flex flex-col w-full">
            <label
                className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                htmlFor={name}>
                {labelName.toUpperCase()}
            </label>
            {
                // Dropdown click button
            }
            <div 
                className="relative flex justify-between items-center h-10 w-full border-b-2 bg-transparent px-2 hover:cursor-pointer" 
                onClick={()=>setOpen(!open)}
                >
                <p className="text-lg">DROPDOWN</p>
                <IoMdArrowDropdown 
                    size={25} 
                    className={`transitio-all duration-100 ease-in-out ${open ? 'rotate-180' : 'rotate-0'}`}
                    />
            </div>
            {
                // Dropdown items
            }
            <div className="absolute">
                
            </div>
        </div>
    )
}