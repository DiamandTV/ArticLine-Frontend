import { DeviceList } from "../../components/Devices/DeviceList/DeviceList";
import { DevicesQuery } from "../../components/Devices/DevicesQuery";
import { PaginationProvider } from "../../components/Pagination/PaginationProvider";
import { PaginationButtonWithContext } from "../../components/Pagination/PaginationRender";

export function Devices(){
    return(
        <PaginationProvider>
            <DevicesQuery>
                <PaginationButtonWithContext/>
                <DeviceList/>
            </DevicesQuery>
        </PaginationProvider>
    )
}