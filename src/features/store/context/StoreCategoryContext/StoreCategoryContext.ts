import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { createContext } from "react";

interface StoreCategoryContextInterface{
    storeCategory?:StoreCategoryInterface
}

export const StoreCategoryContext = createContext<StoreCategoryContextInterface>({})