import { FaStore } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Can } from "../../../config/permissions/can";
import { Link } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { SIDEBAR_ICON_SIZE, SIDEBAR_SUB_ICON_SIZE } from "../../../constraints";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { companyStoreService } from "../../../services/companyStoreService";
import { useEffect } from "react";
import { setStores } from "../../../store/profileSlice";
import { RootState } from "../../../store/store";
import { v4 as uuid } from "uuid";
export function StoreSection(){
    const dispatch = useDispatch()
    const mineStores = useSelector((state:RootState)=>state.profileReduce.stores)
    const {refetch} = useQuery({
        queryKey:['company-stores-list'],
        queryFn:async()=>await companyStoreService.getCompanyStores(),
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            console.log(data.data.results)
            if(data.data) dispatch(setStores(data.data.results))
        }
    })

    useEffect(()=>{
        refetch()
    },[])

    return (
        <Can I="create" a="STORE" >
            <SubMenu id="STORES" icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} label="STORES">
                {mineStores && mineStores.map((store)=>(
                    <Link to={`/store/details/${store.id}`} key={uuid()}>
                        <MenuItem >{store.title.toUpperCase()}</MenuItem>
                    </Link>
                ))}
                {/* CHECK IF THE COMPANY HA MORE THAN FOUR STORES , IF IT'S LIKE THAT SHOW HIM A BUTTON TO SHOW OTHER STORES*/}
                {
                    <Link to={"/store/list/company"}>
                        <MenuItem aria-setsize={SIDEBAR_SUB_ICON_SIZE} className="text-sm">OTHER STORE...</MenuItem>
                    </Link>
                }
                <Link to={"/store/create"}>
                    <MenuItem icon={<FaPlus/>} aria-setsize={SIDEBAR_SUB_ICON_SIZE} className="text-sm">CREATE</MenuItem>
                </Link>
            </SubMenu>
        </Can>
    )
}