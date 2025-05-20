import { EntityAddress } from "@features/autentication/compositions/EntityAddress";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";

type EntityAddressCardProps = React.HTMLAttributes<HTMLElement>
export function EntityAddressCard({...attr}:EntityAddressCardProps){
    return(
        <EntityAddress.Card {...attr} className={tailwindMerge("w-full flex flex-row justify-start items-start gap-2 px-3 py-2",attr.className)} >
            <div className="w-full h-full flex flex-col gap-0.5">
                <EntityAddress.Denomination/>
                <EntityAddress.Address className="text-wrap max-h-20 truncate"/>
                <EntityAddress.PhoneNumber/>
            </div>
        </EntityAddress.Card>
    )
}

export function EntityAddressDetailedCard({...attr}:EntityAddressCardProps){
    const listItemClassName = 'w-full flex flex-row justify-start gap-2'
    return(
        <EntityAddress.Card className={tailwindMerge("relative w-full flex flex-col justify-start items-start gap-2 rounded-lg",attr.className)}>
            <EntityAddress.Image/>
           <EntityAddress.Settings/>
            <EntityAddress.Body className="w-full py-1 flex flex-col gap-2">
                <EntityAddress.Denomination/>
                <div className={listItemClassName}>
                    <EntityAddress.AddressIcon />
                    <EntityAddress.Address/>
                </div>

                <div className={listItemClassName}>
                    <EntityAddress.PhoneIcon/>
                    <EntityAddress.PhoneNumber/>
                </div>

                <div className={listItemClassName}>
                    <EntityAddress.ExtraInfoIcon/>
                    <EntityAddress.ExtraInfo/>
                </div>
            </EntityAddress.Body>
        </EntityAddress.Card>
    )
}