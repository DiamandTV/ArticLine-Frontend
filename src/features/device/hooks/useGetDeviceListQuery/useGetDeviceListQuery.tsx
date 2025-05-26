import { deviceCacheKey } from "@features/device/data/query";
import { DeviceInterface } from "@features/device/model/Device/Interface/DeviceInterface";
import { deviceServices } from "@features/device/services/deviceServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetDeviceListQueryProps{
    params:URLSearchParams
}
export function useGetDeviceListQuery({params}:useGetDeviceListQueryProps){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[deviceCacheKey.list, ...params],
        queryFn:async({pageParam})=>{
            return await deviceServices.list(pageParam,params)
        }
    })

    if(paginationResults.isSuccess){
        return {...paginationResults,data:getDataFromPage<DeviceInterface>(paginationResults.data)}
    }
    return paginationResults
}