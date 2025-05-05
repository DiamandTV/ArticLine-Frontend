import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Button } from "react-bootstrap"
import { FiArrowLeft } from "react-icons/fi"

type BackButtonProps = React.HTMLAttributes<HTMLElement>
export function BackButton(attr:BackButtonProps){
    const className = tailwindMerge("text-2xl",attr.className)
    return(
        <Button {...attr} className={className}>
            <FiArrowLeft />
        </Button>
    )
}