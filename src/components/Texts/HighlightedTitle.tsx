import { twMerge } from "tailwind-merge";

export interface HighlightedTitleProps{
    title:string,
    className?:string,
}
export function HighlightedTitle({title,className}:HighlightedTitleProps){
    return <h1 className={twMerge(`text-3xl font-bold ${className}`)}>{title}</h1>
}