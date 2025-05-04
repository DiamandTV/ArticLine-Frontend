import { tailwindMerge } from '@lib/tsMerge/tsMerge'
type LogoTitleProps = React.HTMLAttributes<HTMLDivElement>
export function LogoTitle(props:LogoTitleProps){
    const className = tailwindMerge("relative flex flex-row justify-center items-end ",props.className)
    return(
        <div {...props} className={className}>
            <h1 className="font-liondales text-5xl lg:text-6xl">A</h1>
            <h1 className="font-liondales text-3xl lg:text-5xl pb-1">rticline</h1>
        </div>
    )
}