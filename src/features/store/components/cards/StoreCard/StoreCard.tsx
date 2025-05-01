import { StoreContext } from "@features/store/context/StoreContext/StoreContext"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { useContext } from "react"
import { Card } from "react-bootstrap"

type StoreCardProps = React.HTMLAttributes<HTMLElement>
export function StoreCard({...attr}:StoreCardProps){
    const {store} = useContext(StoreContext)
    if(!store) return
    const className = tailwindMerge(" "+attr.className)
    return(
        <Card {...attr} className={"rounded-md"}>
            <div className="h-40 w-full bg-cover bg-center rounded-t-md" style={{backgroundImage:`url(${store.image})`}}></div>
            <Card.Body className="p-1 flex flex-col justify-center px-4">
                <Card.Title className=" text-xl font-light font-roboto p-0 m-0">{store.title.toUpperCase()}</Card.Title>
                <div className="w-full flex flex-row justify-center items-center">
                    <StoreCard.Rating/>
                    <StoreCard.Views/>
                    <StoreCard.Distance/>
                </div>
                
            </Card.Body>
        </Card>
    )   
}


StoreCard.Rating = function Rating(){
    return(
        <div></div>
    )
}

StoreCard.Views = function Views(){
    return(
        <div></div>
    )
}

StoreCard.Distance = function Distance(){
    return(
        <div></div>
    )
}


