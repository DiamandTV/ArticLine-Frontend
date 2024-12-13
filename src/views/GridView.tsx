export function GridView({children,className}:{children:React.ReactNode,className?:string}){
    return(
        <div className={"w-full max-h-max grid grid-cols-3 gap-4 "+className}>
            {children}  
        </div>
    )
}