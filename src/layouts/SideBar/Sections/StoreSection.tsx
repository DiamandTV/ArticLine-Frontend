import { FaStore } from "react-icons/fa";
import { Can } from "../../../config/permissions/can";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { StoreCreateIcon } from "../../../components/Icons/StoreCreate";
import { CompanyProtectedRoute } from "../../../router/CompanyProtectedRoute";
import { StoreOrderIcon } from "../../../components/Icons/StoreOrder";

import { StoreOrderBatchIcon } from "../../../components/Icons/StoreOrderBatch";
export function StoreSection(){
    return (
        <CompanyProtectedRoute>
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
            
                    <Link to={"/store/list/company"}>
                        <MenuItem  className="text-sm" icon={<FaStore size={SIDEBAR_ICON_SIZE}/>}>STORES</MenuItem>
                    </Link>
                    {/*
                    <Link to={"/orders/company"}>
                        <MenuItem className="text-sm">ORDERS</MenuItem>
                    </Link>
                    */
                    } 
                    <Link to={"/store/create"}>
                        <MenuItem icon={<StoreCreateIcon size={SIDEBAR_ICON_SIZE}/>} className="text-sm">CREATE</MenuItem>
                    </Link>
                    <Link to={"/orders/company"}>
                        <MenuItem className="text-sm" icon={<StoreOrderIcon size={SIDEBAR_ICON_SIZE}/>}>ORDERS</MenuItem>
                    </Link> 
                    <Link to={'/orders/batch/company'}>
                        <MenuItem id="ORDERS" className="text-sm" icon={<StoreOrderBatchIcon size={SIDEBAR_ICON_SIZE}/>} >BATCH</MenuItem>                    
                    </Link>
            </Can>
        </CompanyProtectedRoute>
    )
}