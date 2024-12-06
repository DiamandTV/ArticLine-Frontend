import { RxCross2 } from "react-icons/rx";
export interface TagCardProps{
    children:React.ReactNode,
    onDeleteClick:(e:React.MouseEvent)=>void
}
export function TagCard({children,onDeleteClick}:TagCardProps){
    return (
        <div className="max-w-max h-max px-3 py-1 flex flex-row justify-center items-center gap-x-1 text-sm border-2 border-gray-300 rounded-full">
            {children}
            {onDeleteClick ?  <RxCross2 size={18} className="hover:cursor-pointer" onClick={(e)=>onDeleteClick(e)}/>  : null}
        </div>
    )
}