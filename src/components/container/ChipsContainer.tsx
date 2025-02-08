import { twMerge } from "tailwind-merge"

interface ChipsContainerProps{
    title:string,
    className?:string,
    children:React.ReactNode
}
export function ChipsContainer({title,children,className=""}:ChipsContainerProps){
    return(
        <div className={twMerge("w-full p-2 py-2  h-20 bg-slate-900 bg-opacity-50 backdrop-blur-lg  rounded-xl col-span-2 overflow-hidden flex flex-col gap-2.5 "+className)}>          
                    <span className="text-xs ">{title}</span>
                    <div className="w-full h-full px-2 flex flex-row flex-wrap gap-2">
                        {children}
                    </div>
                </div>
    )
}