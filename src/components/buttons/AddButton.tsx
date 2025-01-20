import { IoMdAdd } from "react-icons/io";

import { twMerge } from "tailwind-merge";
interface AddButtonProps{
    onClick:()=>void,
    showText?:boolean,
    className?:string
}
export function AddButton({onClick,showText=true,className=""}:AddButtonProps){
    return ( 
        <div onClick={onClick} className={`${twMerge(className)} max-w-max flex flex-row bg-sky-400 items-center justify-center py-2 px-4 rounded-xl gap-x-2`}>
            <IoMdAdd size={22.5}/>
            <span hidden={!showText}>ADD</span>
        </div>
    )
}