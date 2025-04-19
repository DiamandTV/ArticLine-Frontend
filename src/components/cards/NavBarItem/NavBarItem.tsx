import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Button } from "react-bootstrap"

interface NavBarItemProps extends React.HTMLAttributes<HTMLDivElement>{
    title:string
    icon:React.ReactNode,
    
}
export function NavBarItem(props:NavBarItemProps){
    const className = tailwindMerge("w-full flex flex-row items-center justify-start gap-2 font-roboto text-xl")
    return(
        <Button className={className} variant="outline-dark">
            {props.icon}
            <h3 className="font-light">{props.title}</h3>
        </Button>
    )
}