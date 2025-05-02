import { tailwindMerge } from "@lib/tsMerge/tsMerge"

interface BadgeProps extends React.HTMLAttributes<HTMLElement>{
    badgeContent?:string,
    children:React.ReactNode
}
export function Badge({badgeContent,children,...props}:BadgeProps){    
    const className = tailwindMerge('w-max h-max relative '+props.className)
    return(
        <div {...props} className={className}>
            <div className={`w-max h-max flex flex-col justify-center items-center absolute text-xs text-surface-tonal-a10 font-bold top-0 right-0 -translate-y-1/4 translate-x-1/4 font-sans rounded-full bg-red-700 ${badgeContent ? "px-1 py-0.5" : ''} `}>
                {badgeContent}
            </div>   
            {children}
        </div>
    )
}   