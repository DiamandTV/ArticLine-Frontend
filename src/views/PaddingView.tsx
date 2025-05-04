import { tailwindMerge } from "@lib/tsMerge/tsMerge"

interface PaddinViewProps extends React.HtmlHTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function PaddingView({children,...attr}:PaddinViewProps){
    const className = tailwindMerge("w-full h-min flex flex-col justify-center items-start px-2 py-2 overflow-scroll ",attr.className)
    return(
        <div {...attr} className={className}>
            {children}
        </div>
    )
}