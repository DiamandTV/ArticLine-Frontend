export interface TextButtonProps{
    className?:string,
    text?:string,
    children?:React.ReactNode,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void,
    type?:"button" | "submit" | "reset" | undefined,
}
export function TextButton({text,children,onClick,className,type="button"}:TextButtonProps){
    return(
        <button            
            className={` hover:cursor-pointer hover:bg-sky-300 box-border p-4 bg-sky-500 rounded-xl text-md w-full ${className} text_button_all`}
            onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                if (onClick){
                    onClick(e)
                }
            }}
            type={type}
        >   
            {text && <span>{text}</span>}
            {children}
        </button>
    )
}