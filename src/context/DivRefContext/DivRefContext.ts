import { createContext, RefObject } from "react";

interface DivRefContextInterface{
    divRef?:RefObject<HTMLDivElement|null>
}

export const DivRefContext = createContext<DivRefContextInterface>({})