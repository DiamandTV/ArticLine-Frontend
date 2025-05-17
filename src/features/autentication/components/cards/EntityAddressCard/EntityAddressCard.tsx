import { EntityAddress } from "@features/autentication/compositions/EntityAddress";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";

type EntityAddressCardProps = React.HTMLAttributes<HTMLElement>
export function EntityAddressCard({...attr}:EntityAddressCardProps){
    return(
        <EntityAddress.Card className={tailwindMerge("w-full flex flex-row justify-start items-start gap-2 px-3 py-2",attr.className)}>
            <div className="py-0.5">
                <EntityAddress.Icon/>
            </div>
            <div className="w-full h-full flex flex-col gap-0.5">
                <EntityAddress.Denomination/>
                <EntityAddress.Address className="text-wrap max-h-20 truncate"/>
                <EntityAddress.PhoneNuber/>
            </div>
        </EntityAddress.Card>
    )
}