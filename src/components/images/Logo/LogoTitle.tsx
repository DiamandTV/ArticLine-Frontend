import { tailwindMerge } from '@lib/tsMerge/tsMerge'
interface LogoTitleProps extends React.HTMLAttributes<HTMLDivElement>{
    firstLetterClassName?:string,
    restLettersClassName?:string
}
export function LogoTitle(props:LogoTitleProps){
    const className = tailwindMerge("relative flex flex-row justify-center items-end ",props.className)
    return(
        <div {...props} className={className}>
            <h1 className={tailwindMerge("font-liondales text-5xl lg:text-6xl",props.firstLetterClassName)}>A</h1>
            <h1 className={tailwindMerge("pb-1 text-3xl font-liondales lg:text-5xl",props.restLettersClassName)}>rticline</h1>
        </div>
    )
}