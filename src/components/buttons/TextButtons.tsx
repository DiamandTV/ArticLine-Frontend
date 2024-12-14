export interface TextButtonProps{
    className?:string,
    text?:string,
    children?:React.ReactNode,
    onClick:()=>void,
    type?:"button" | "submit" | "reset" | undefined,
}
export function TextButton({text,children,onClick,className,type="button"}:TextButtonProps){
    return(
        <button
            className={`max-w-max hover:cursor-pointer hover:bg-sky-300 box-border p-4 bg-sky-500 rounded-xl text-md ${className}`}
            onClick={onClick}
            type={type}
        >   
            {text && <span>{text}</span>}
            {children}
        </button>
    )
}