import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FiSettings } from "react-icons/fi";

type SettingsButtonProps = React.HTMLAttributes<HTMLElement>
export function SettingsButton(attr:SettingsButtonProps){
    return(
        <button
        type="button"
        onClick={(e) => {
            e.stopPropagation();
            attr.onClick?.(e)
            
        }}
        className={tailwindMerge("w-max absolute top-0  p-1 m-1 rounded-full bg-black/50 hover:bg-black/70 transition",attr.className)}
        >
        <FiSettings className="text-white" size={22} />
        </button>
    )
}