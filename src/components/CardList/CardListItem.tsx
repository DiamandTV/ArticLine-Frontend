export function CardListItem({children,className}:{children:React.ReactNode,className?:string}){
    return (
        <div className={`absolute  ${className} bg-transparent`}>
            {children}
        </div>
    )
}