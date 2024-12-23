import { MenuItem } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { Link } from "react-router-dom";
import { FaClipboardUser } from "react-icons/fa6";
export function OrderSection(){
    return(
        <Link to={'/orders'}>
            <Link to="orders">
                <MenuItem id="ORDERS" icon={<FaClipboardUser size={SIDEBAR_ICON_SIZE}/>} >ORDERS</MenuItem>
            </Link>
        </Link>
    )
}