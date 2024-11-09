interface IconbuttonProps{
    children:React.ReactNode
    className:string
    onClick:()=>void 
}
export function Iconbutton({children,className,onClick}:IconbuttonProps){
    return (
        <div className="p-4 bg-sky-400 rounded-xl ">

        </div>
    )
}