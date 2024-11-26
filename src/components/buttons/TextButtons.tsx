export interface TextButtonProps{
    className?:string,
    text?:string,
    children?:React.ReactNode,
    onClick:()=>void,
}
export function TextButton({text,children,onClick,className}:TextButtonProps){
    return(
        <button
            className={`max-w-max p-2 hover:cursor-pointer hover:bg-sky-300 box-content p-4 bg-sky-500 rounded-xl text-md ${className}`}
            onClick={onClick}
        >   
            {text && <span>{text}</span>}
            {children}
        </button>
    )
}