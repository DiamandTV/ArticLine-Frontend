import { CategoryContext } from "@features/home/context/Category/CategoryContext";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useContext } from "react";
import { Card } from "react-bootstrap";


type CategoryCardProps = React.HTMLAttributes<HTMLElement>
export function CategoryCard({...attr}:CategoryCardProps) {
    const {category} = useContext(CategoryContext)
    if(!category) return null
    const {image,name} = category
    const className = tailwindMerge("w-40 h-40 flex-shrink-0 ",attr.className)
    return (
        <Card {...attr} className={className}>
            <div className="h-full w-full bg-cover bg-center rounded-t-md" style={{backgroundImage:`url(${image})`}}></div>
            <Card.Body className="p-1 flex flex-col justify-center items-center">
                <Card.Title className="text-lg font-normal font-sans p-0 m-0">{name.toUpperCase()}</Card.Title>
                {
                //   <Card.Text>{description}</Card.Text>
                }
            </Card.Body>
        </Card>
    )
}