import { twMerge } from "tailwind-merge"

interface LightBlurCardProps{
    children:React.ReactNode,
    className?:string,
    style?:React.CSSProperties
}
export function LightBlurCard({children,className="",style}:LightBlurCardProps){
    return (
        <div className={twMerge("w-full p-8 bg-slate-700 bg-opacity-50 backdrop-blur-lg rounded-xl "+className)} style={style}>
            {children}
        </div>
    )
}