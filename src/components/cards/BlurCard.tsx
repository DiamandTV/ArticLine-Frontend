
interface BlurCardProps{
    children:React.ReactNode,
    className?:string,
    style?:React.CSSProperties
}
export function BlurCard({children,className="",style}:BlurCardProps){
    return (
        <div className={"w-full p-8 bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl "+className} style={style}>
            {children}
        </div>
    )
}