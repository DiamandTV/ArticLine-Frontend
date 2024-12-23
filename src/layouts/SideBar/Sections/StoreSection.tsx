import { FaStore } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Can } from "../../../config/permissions/can";
import { Link } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE, SIDEBAR_SUB_ICON_SIZE } from "../../../constraints";
export function StoreSection(){
    return (
        <Can I="create" a="STORE" >
            {/*}
            <SubMenu id="STORES" icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} label="STORES">
                {mineStores && mineStores.map((store)=>(
                    <Link to={`/store/details/${store.id}`} key={uuid()}>
                        <MenuItem >{store.title}</MenuItem>
                    </Link>
                ))}
        
                {
                    mineStores.length > 4 ?
                    <Link to={"/store/list/company"}>
                        <MenuItem aria-setsize={SIDEBAR_SUB_ICON_SIZE} className="text-sm">OTHER STORE...</MenuItem>
                    </Link> : null
                }
                <Link to={"/store/create"}>
                    <MenuItem icon={<FaPlus/>} aria-setsize={SIDEBAR_SUB_ICON_SIZE} className="text-sm">CREATE</MenuItem>
                </Link>
            </SubMenu>
                */}
            <SubMenu id="STORES" icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} label="STORES">
                <Link to={"/store/list/company"}>
                    <MenuItem  className="text-sm">OTHER STORE</MenuItem>
                </Link>
                <Link to={"/orders/company"}>
                    <MenuItem className="text-sm">ORDERS</MenuItem>
                </Link> 
                <Link to={"/store/create"}>
                    <MenuItem icon={<FaPlus/>} className="text-sm">CREATE</MenuItem>
                </Link>
            </SubMenu>
        </Can>
    )
}