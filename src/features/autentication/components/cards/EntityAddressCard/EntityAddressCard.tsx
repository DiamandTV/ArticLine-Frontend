import { EntityAddress } from "@features/autentication/compositions/EntityAddress";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";

type EntityAddressCardProps = React.HTMLAttributes<HTMLElement>
export function EntityAddressCard({...attr}:EntityAddressCardProps){
    return(
        <EntityAddress.Card {...attr} className={tailwindMerge("w-full h-full flex flex-row justify-start items-start gap-2 px-3 py-2",attr.className)} >
            <div className="w-full h-full flex flex-col gap-0.5">
                <EntityAddress.Denomination/>
                <EntityAddress.Address className="truncate text-wrap max-h-20"/>
                <EntityAddress.PhoneNumber/>
            </div>
        </EntityAddress.Card>
    )
}

interface EntityAddressDetailedCard extends React.HTMLAttributes<HTMLElement>{
    cardClassName?:string,
    imageClassName:string,
}
export function EntityAddressDetailedCard({cardClassName,imageClassName,...attr}:EntityAddressDetailedCard){
    const listItemClassName = 'w-full flex flex-row justify-start gap-2'
    return(
        <EntityAddress.Card {...attr} className={tailwindMerge("h-full relative w-full flex flex-col justify-start items-start gap-2 rounded-lg",cardClassName)}>
            <EntityAddress.Image className={tailwindMerge("md:h-[300px]",imageClassName)}/>
           <EntityAddress.Settings/>
            <EntityAddress.Body className="flex flex-col w-full gap-2 py-1">
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