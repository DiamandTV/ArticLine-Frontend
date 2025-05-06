import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
type DeleteButtonProps = React.HTMLAttributes<HTMLElement>
export function DeleteButton({...attr}:DeleteButtonProps){
    const className = tailwindMerge("text-xl",attr.className)
    return(
        <Button {...attr} className={className} variant="danger">
            <MdDelete />
        </Button>
    )
}