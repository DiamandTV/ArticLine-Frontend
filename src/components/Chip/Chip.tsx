import { tailwindMerge } from "@lib/tsMerge/tsMerge"

interface ChipProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function Chip({children,...attr}:ChipProps){
    const className = tailwindMerge("w-max h-max flex flex-row justify-center items-center bg-primary-a30 px-2 py-1 rounded-full text-surface-tonal-a10 font-medium text-sm ",attr.className)
    return(
        <div {...attr} className={className}>
            {children}
        </div>
    )
}