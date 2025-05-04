import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Alert } from "react-bootstrap"
import { Variant } from "react-bootstrap/esm/types"

export interface AlertCardProps extends React.HTMLAttributes<HTMLElement>{
    variant:Variant,
    title:string,
    message:string,
    action?:React.ReactNode
}
export function AlertCard({title,message,action,...props}:AlertCardProps){
    const className = tailwindMerge("w-full flex flex-col justify-center items-center text-center ",props.className)
    return(
        <Alert className={className} {...props}>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-2 text-base">{message}</p>
            {action}
        </Alert>
    )
}