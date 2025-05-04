import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { SimpleLoader } from "../SimpleLoader/SimpleLoader"

type NavigationLoaderProps = React.HTMLAttributes<HTMLElement>
export function NavigationLoader(props:NavigationLoaderProps){
    const className = tailwindMerge("w-screen min-h-screen h-max flex flex-row justify-center items-center ",props.className)
    return (
        <div {...props} className={className}>
            <SimpleLoader className="w-32 h-32 flex flex-col justify-center items-center"/>  
        </div>
    )
}

