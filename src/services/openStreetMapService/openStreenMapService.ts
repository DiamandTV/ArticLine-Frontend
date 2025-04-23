import { OpenStreetMapPlaceDetailedInterface, OpenStreetMapServiceSearchParams } from "@models/openStreetMapPlace/OpenStreetMapPlaceInterface"
import axios, { AxiosResponse } from "axios"


export const openStreetMapService = {
    search:async(address:string,params:OpenStreetMapServiceSearchParams):Promise<AxiosResponse<Array<OpenStreetMapPlaceDetailedInterface>>>=>{
        return axios.
            get(
                `https://nominatim.openstreetmap.org/search?q=${address}&format=${params.format}&limit=${params.limit}&addressdetails=1`
        )
    },
    reverse:async({lat,long}:{lat:number,long:number}):Promise<AxiosResponse<OpenStreetMapPlaceDetailedInterface>>=>{
        return axios.
            get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
            )
    }
}