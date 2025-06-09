import { ProfileType } from "@features/autentication/models/Profile/Interface/Type";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FaBuilding, FaTruck, FaUser } from "react-icons/fa";

interface AuthTypeIconProps extends React.HTMLAttributes<HTMLElement>{
    type:ProfileType
}
export function AuthTypeIcon({type,...attr}:AuthTypeIconProps){
    const className = tailwindMerge('',attr.className)
    switch(type){
        case 'USER':
            return (
                <div {...attr} className={className}>
                    <FaUser />
                </div>
            )
        case 'COURIER':
            return (
                <div {...attr} className={className}>
                    <FaBuilding/>
                </div>
            )
        case 'COMPANY':
            return (
                <div {...attr} className={className} >
                    <FaTruck/>
                </div>
            )
    }
}