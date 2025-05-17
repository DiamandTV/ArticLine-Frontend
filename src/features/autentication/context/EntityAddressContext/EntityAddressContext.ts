import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";
import { createContext } from "react";

export interface EntityAddressContextInterface {
    entityAddress:EntityAddressInterface
}

export const EntityAddressContext = createContext<Partial<EntityAddressContextInterface>>({})