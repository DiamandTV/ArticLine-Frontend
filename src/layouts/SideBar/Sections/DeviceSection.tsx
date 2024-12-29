import { BsDeviceHddFill } from "react-icons/bs";
import { MenuItem } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { CompanyProtectedRoute } from "../../../router/CompanyProtectedRoute";
import { Link } from "react-router-dom";
export function DeviceSection(){
    return(
        <CompanyProtectedRoute>
            <Link to="/devices/list/company">
                <MenuItem icon={<BsDeviceHddFill size={SIDEBAR_ICON_SIZE}/>}>
                    DEVICES
                </MenuItem>
            </Link>
        </CompanyProtectedRoute>
    )
}