import { twMerge } from "tailwind-merge"
export function GridView({children,className="",grid=3}:{children:React.ReactNode,grid?:number,className?:string}){
    return(
        <div className={twMerge(`w-full max-h-max grid grid-cols-${grid} gap-4 ${className}`)}>
            {children}  
        </div>
    )
}