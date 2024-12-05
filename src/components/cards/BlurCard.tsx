
interface BlurCardProps{
    children:React.ReactNode,
    className?:string
}
export function BlurCard({children,className=""}:BlurCardProps){
    return (
        <div className={"w-full p-8 bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl "+className}>
            {children}
        </div>
    )
}