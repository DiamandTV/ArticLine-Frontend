import { BiTrash } from "react-icons/bi";
interface DeleteButtonProps{
    onClick:()=>void
}

export function DeleteButton({onClick}:DeleteButtonProps){
    return (
        <div 
            className="max-w-max h-full flex flex-col justify-center items-center px-4 bg-red-600 rounded-xl hover:cursor-pointer "
            onClick={onClick}
        >
            <BiTrash size={25} color="white"/>
        </div>
    )
}