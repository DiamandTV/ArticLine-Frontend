import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MenuItem } from "react-pro-sidebar";
import { IoMdCart } from "react-icons/io";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { Link } from "react-router-dom";

export function CartSection(){
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    if(!carts || Object.keys(carts).length == 0) return
    return(
        <Link to={'/carts'}>
            <MenuItem  id="CART" icon={<IoMdCart size={SIDEBAR_ICON_SIZE} />}>CART</MenuItem>
        </Link>
    )
}