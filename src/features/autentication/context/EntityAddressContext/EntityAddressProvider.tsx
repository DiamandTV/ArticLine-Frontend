import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";
import { EntityAddressContext, EntityAddressContextInterface } from "./EntityAddressContext";
import { useContext } from "react";
import { WithRequiredProperty } from "@utils/typescript/withRequiredProperty";

interface EntityAddressProviderProps{
    entityAddress:EntityAddressInterface,
    children:React.ReactNode
}
export function EntityAddressProvider({children,entityAddress}:EntityAddressProviderProps){
    return(
        <EntityAddressContext.Provider value={{entityAddress}}>
            {children}
        </EntityAddressContext.Provider>
    )
}

export function useEntityAddressContext():WithRequiredProperty<EntityAddressContextInterface,'entityAddress'>{
    const context = useContext(EntityAddressContext)
    if(context && context.entityAddress){
        return {...context,entityAddress:context.entityAddress}
    }
    throw new Error("useEntityAddressContext can only be used within EntityAddressProvider")
}