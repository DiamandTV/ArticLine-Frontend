import { twMerge } from "tailwind-merge"
interface IconButtonProps{
    className?:string,
    icon:React.ReactNode
    onClick:(e:React.MouseEvent<HTMLDivElement>)=>void
}
export function IconButton({className,icon,onClick}:IconButtonProps){
    return (
        <div className={twMerge("max-w-max p-2 "+className)} onClick={onClick}>
            {icon}
        </div>
    )
}