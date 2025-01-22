interface ChipsContainerProps{
    title:string,
    children:React.ReactNode
}
export function ChipsContainer({title,children}:ChipsContainerProps){
    return(
        <div className="w-full p-2 py-2  h-20 bg-slate-900 bg-opacity-50 backdrop-blur-lg  rounded-xl col-span-2 overflow-hidden flex flex-col gap-2.5">          
                    <span className="text-xs ">{title}</span>
                    <div className="w-full h-full px-2 flex flex-row flex-wrap gap-2">
                        {children}
                    </div>
                </div>
    )
}