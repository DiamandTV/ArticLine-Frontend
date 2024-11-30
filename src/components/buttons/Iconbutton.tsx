interface IconbuttonProps{
    children?:React.ReactNode,
    className?:string,
    icon:string,
    size?:number,
    onClick:()=>void 
}
export function Iconbutton({children,icon,className,onClick}:IconbuttonProps){
    return (
    <div className={`max-w-max p-3  rounded-xl justify-self-end bg-slate-200 bg-opacity-30 backdrop-blur-lg ${className}`}>
        <{icon}
            size={30}
            color='white'
            
        />
    </div>    
)
}