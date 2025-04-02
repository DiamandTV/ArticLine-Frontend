import { FaUser } from "react-icons/fa6";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";

export function ProfileSection(){
    return(
        <Link to="/profile">
            <MenuItem id="ACCOUNT" icon ={<FaUser size={SIDEBAR_ICON_SIZE}/>}>ACCOUNT</MenuItem>
        </Link>
    )
}