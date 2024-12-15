import { BiTrash } from "react-icons/bi";
import { twMerge } from 'tailwind-merge'
interface DeleteButtonProps{
    onClick:()=>void,
    className?:string
}

export function DeleteButton({onClick,className=""}:DeleteButtonProps){
    return (
        <div 
            className={twMerge("max-w-max h-full flex flex-col justify-center items-center px-4 bg-red-600 rounded-xl hover:cursor-pointer text-2xl "+className)}
            onClick={onClick}
        >
            <BiTrash  color="white"/>
        </div>
    )
}