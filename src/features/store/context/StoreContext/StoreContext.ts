import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface"
import { createContext } from "react"

interface StoreContextInterface{
    store?:StoreInterface
}

export const StoreContext = createContext<StoreContextInterface>({
    store:undefined
})