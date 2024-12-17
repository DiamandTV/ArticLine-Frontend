import { MenuItem } from "react-pro-sidebar";
import { IoMdCart } from "react-icons/io";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { Link } from "react-router-dom"
import { CartsQuery } from "../../../components/Cart/CartsQuery";

export function CartSection(){
    //if(!carts || Object.keys(carts).length == 0) return
    return(
        <CartsQuery load={false}>
            <Link to={`carts`} >
                <MenuItem id="CART" icon={<IoMdCart size={SIDEBAR_ICON_SIZE}/>} >CARTS</MenuItem>   
            </Link>
        </CartsQuery>
    )
}