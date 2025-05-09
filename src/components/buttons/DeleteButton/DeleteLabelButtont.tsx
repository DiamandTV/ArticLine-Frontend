import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FiTrash2 } from "react-icons/fi";

interface DeleteLabelButtonProps extends React.HTMLAttributes<HTMLElement>{
    text:string,
    iconClassName?:string,
    textClassName?:string
}
export function DeleteLabelButton({text,iconClassName,textClassName,...attr}:DeleteLabelButtonProps){
    const className = tailwindMerge("w-full  flex flex-row justify-center items-center gap-3 px-2 py-3 rounded-lg bg-surface-a10 hover:bg-red-100 transition",attr.className)
    iconClassName = tailwindMerge("text-2xl text-red-600",iconClassName)
    textClassName = tailwindMerge("font-semibold ",textClassName)
    return(
        <button
            className={className}
            {...attr}
            >
            <FiTrash2 className={iconClassName}/>
            <span className={textClassName}>{text}</span>
        </button>
    )
}