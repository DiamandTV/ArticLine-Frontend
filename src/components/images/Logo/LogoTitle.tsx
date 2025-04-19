import { tailwindMerge } from '@lib/tsMerge/tsMerge'
type LogoTitleProps = React.HTMLAttributes<HTMLDivElement>
export function LogoTitle(props:LogoTitleProps){
    const className = tailwindMerge("relative flex flex-row justify-center items-center "+props.className)
    return(
        <div {...props} className={className}>
            <h1 className="font-orbitron text-2xl font-semibold">ARTICLINE</h1>
        </div>
    )
}