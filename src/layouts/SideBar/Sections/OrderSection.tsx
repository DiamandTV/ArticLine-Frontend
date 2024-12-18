import { MenuItem } from "react-pro-sidebar";
import { FaClipboardList } from "react-icons/fa6";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { Link } from "react-router-dom";

export function OrderSection(){
    return(
        <Link>
            <MenuItem id="ORDERS" icon={<FaClipboardList size={SIDEBAR_ICON_SIZE}/>} >ORDERS</MenuItem>
        </Link>
    )
}