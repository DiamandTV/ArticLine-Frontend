import { twMerge } from "tailwind-merge"
export function GridView({children,className=""}:{children:React.ReactNode,className?:string}){
    return(
        <div className={twMerge(`w-full max-h-max grid grid-cols-1 @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3 ${className}`)}>
            {children}  
        </div>
    )
}