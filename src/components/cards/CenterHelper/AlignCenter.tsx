import { tailwindMerge } from "@lib/tsMerge/tsMerge"

interface AlignCenterProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}

// !!! TRY TO NOT STYLE TOO MUCH THIS COMPONENT FROM OUTSIDE
export function AlignCenter(props:AlignCenterProps){
    const className = tailwindMerge("w-full min-h-screen max-h-max flex flex-row items-center justify-center p-2 "+props.className)
    return(
        <div {...props} className={className}>
            {props.children}  
        </div>
    )
}