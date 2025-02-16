import { DOMAttributes } from "react"
import { twMerge } from "tailwind-merge"

type  OverlayBlockProps = {
    showOverlay:boolean,
    className?:string,
    children:React.ReactNode
} & DOMAttributes<HTMLDivElement>

export function OverlayBlock(props:OverlayBlockProps){
    return(
        <div className="relative h-full">
            <div onClick={props.onClick} className={twMerge(`absolute z-30 w-full min-h-screen h-full  ${props.showOverlay ? 'bg-black/30' : 'bg-transparent'} ${props.className}` )}></div>
            {props.children}
        </div>
    )
}