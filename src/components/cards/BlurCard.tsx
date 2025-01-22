import { twMerge } from "tailwind-merge"

interface BlurCardProps{
    children:React.ReactNode,
    className?:string,
    style?:React.CSSProperties,
    onClick?:()=>void
}
export function BlurCard({children,className="",style,onClick}:BlurCardProps){
    return (
        <div className={twMerge("w-full p-8 bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl "+className)} style={style} onClick={onClick}>
            {children}
        </div>
    )
}