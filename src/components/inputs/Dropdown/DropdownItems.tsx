interface DropdownItemProps{
    title:string
    icon?:unknown
    className?:string
    style?: React.CSSProperties // this is used frequently in the case of the large data list 
    onClick:()=>void
}
export function DropdownItem({title,icon,className,style,onClick}:DropdownItemProps){
    return (
        <div 
            style={style}
            className={`flex w-full h-10 px-4 items-center ${icon != null ? 'justify-between' : 'justify-start'} hover:bg-slate-900 hover:cursor-pointer ${className}`}
            onMouseDown={onClick}
            >
            <p className="text-lg text-ellipsis overflow-hidden text-nowrap">{title}</p>
            {icon != null ? (icon as React.ReactNode) : null}
        </div>
    )
}