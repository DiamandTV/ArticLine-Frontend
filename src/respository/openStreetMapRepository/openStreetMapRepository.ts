import { OpenStreetMapPlaceDetailedInterface, OpenStreetMapPlaceInterface, OpenStreetMapServiceSearchParams } from "@models/openStreetMapPlace/OpenStreetMapPlaceInterface";
import { openStreetMapService } from "@services/openStreetMapService/openStreenMapService";

export const openStreetMapRepository = {
    search: async(address:string,params:OpenStreetMapServiceSearchParams={
        format:'json',
        limit:10
    }):Promise<Array<OpenStreetMapPlaceInterface>>=>{
        const openStreetData =  await openStreetMapService.search(address,params)
        return openStreetData.data.map((detailedPlace:OpenStreetMapPlaceDetailedInterface):OpenStreetMapPlaceInterface=>{
            return {
                display_name:detailedPlace.display_name,
                address:detailedPlace.address
            }
        })
    },
    reverse: async(coordinate:{lat:number,long:number}):Promise<string>=>{
        const openStreetData = await openStreetMapService.reverse(coordinate)
        return openStreetData.data.display_name
    }
}