import { Card } from "react-bootstrap"
import { useEntityAddressContext } from "../context/EntityAddressContext/EntityAddressProvider"
import { GoLocation } from "react-icons/go"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"

export const EntityAddress = ()=>null

interface EntityAddressProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}

EntityAddress.Card = function _Card({children,...attr}:EntityAddressProps){
    return(
        <Card {...attr}>
            {children}
        </Card>
    )
}

EntityAddress.Image = function Image({...attr}:Omit<EntityAddressProps,'children'>){
    return(
        
    )
}

EntityAddress.Icon = function Icon(){
    return(
         <GoLocation className={"text-2xl text-surface-a30"}/>
    )
}

EntityAddress.Denomination = function Denomination({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <h1 className={tailwindMerge('text-base font-semibold',attr.className)}>
            {entityAddress.denomination}
        </h1>
    )
}


EntityAddress.Address = function Address({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <p className={tailwindMerge("text-sm font-light",attr.className)}>
            {entityAddress.address.full_address}
        </p>
    )
}

EntityAddress.PhoneNuber = function PhoneNumber({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <span className={tailwindMerge("text-sm font-light",attr.className)}>
            {entityAddress.phone_number}
        </span>
    )
}