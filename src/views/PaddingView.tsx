interface PaddinViewProps extends React.HtmlHTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function PaddingView({children}:PaddinViewProps){
    return(
        <div className="w-full h-min flex flex-col justify-center items-start px-2 py-2 overflow-scroll">
            {children}
        </div>
    )
}