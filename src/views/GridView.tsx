import { twMerge } from "tailwind-merge"
export function GridView({children,className=""}:{children:React.ReactNode,className?:string}){
    return(
        <div className={twMerge(`w-full max-h-max grid grid-cols-3 gap-4 ${className}`)}>
            {children}  
        </div>
    )
}