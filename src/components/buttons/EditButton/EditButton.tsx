import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FiEdit2 } from "react-icons/fi";

interface EditLabelButtonProps extends React.HTMLAttributes<HTMLElement>{
    text:string,
    iconClassName?:string,
    textClassName?:string
}
export function EditLabelButton({text,iconClassName,textClassName,...attr}:EditLabelButtonProps){
    const className = tailwindMerge("w-full  flex flex-row justify-center items-center gap-2 px-2 py-3 rounded-lg bg-surface-a10 hover:bg-red-100 transition",attr.className)
    iconClassName = tailwindMerge("text-2xl text-primary-a30",iconClassName)
    textClassName = tailwindMerge("font-semibold ",textClassName)
    return(
        <button
        {...attr}    
        className={className}

            >
            <FiEdit2 className={iconClassName}/>
            <span className={textClassName}>{text}</span>
        </button>
    )
}