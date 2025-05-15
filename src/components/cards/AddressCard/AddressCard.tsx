import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { extend } from "dayjs";
import { Card } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { IoHome } from "react-icons/io5";
interface AddressCardProps extends React.HTMLAttributes<HTMLElement>{
    address:string
    isHome:boolean
}
export function AddressCard({address,isHome,...attr}:AddressCardProps){
    const getIcon = (isHome:boolean)=>{
        const iconClassName = "text-4xl text-surface-a30"
        if(isHome){
            return <IoHome className={iconClassName}/>
        } else {
            return <GoLocation className={iconClassName}/>
        }
    }
    return(
        <Card className={tailwindMerge("w-full h-[58px] flex flex-row justify-start items-center gap-4 px-3 py-2",attr.className)}>
            {getIcon(isHome)}
            <span className="text-wrap font-thin text-base truncate">{address}</span>
        </Card>
    )
}