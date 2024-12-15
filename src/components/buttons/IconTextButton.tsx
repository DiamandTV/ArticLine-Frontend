interface IconTextButtonProps{
    label:string,
    icon:React.ReactNode,
    onClick:()=>void,
    className?:string
}
export function IconTextButton({label,icon,className,onClick}:IconTextButtonProps){
    return(
        <div
            className={"p-2 hover:bg-slate-900 w-full flex flex-row justify-center items-center gap-x-3 text-xl border-2 border-slate-300 rounded-xl hover:cursor-pointer " +className}
            onClick={()=>onClick()}>
            <span>{label}</span>
            {icon}
        </div>
    )
}