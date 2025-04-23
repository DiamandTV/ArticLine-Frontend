import { OpenStreetMapPlaceInterface } from "@models/openStreetMapPlace/OpenStreetMapPlaceInterface"
import { createContext } from "react"
import { UseMutationResult } from "react-query"
type OpenStreetSearchContextProps =  UseMutationResult<OpenStreetMapPlaceInterface[], unknown, string, unknown>
export const OpenStreetSearchContext = createContext<Partial<OpenStreetSearchContextProps>>({})