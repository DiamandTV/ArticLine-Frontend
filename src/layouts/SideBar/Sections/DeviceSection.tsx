import { BsDeviceHddFill } from "react-icons/bs";
import { MenuItem } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { CompanyProtectedRoute } from "../../../router/CompanyProtectedRoute";
export function DeviceSection(){
    return(
        <CompanyProtectedRoute>
            <MenuItem icon={<BsDeviceHddFill size={SIDEBAR_ICON_SIZE}/>}>
                DEVICES
            </MenuItem>
        </CompanyProtectedRoute>
    )
}