import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { IoMdCart } from "react-icons/io";
import { SIDEBAR_ICON_SIZE } from "../../../constraints";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { useCartService } from "../../../services/cartService";
import { setCarts } from "../../../store/cartsSlice";
export function CartSection(){
    const dispatch = useDispatch()
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['profile-get-carts'],
        queryFn:async()=>{
            return useCartService.getCartsList()
        },
        onSuccess:(data)=>{
            if(data && data.data ){
                console.log(data.data)
                dispatch(setCarts(data.data))
            }
        },
    })
    //if(!carts || Object.keys(carts).length == 0) return
    return(
        <SubMenu id="CART" icon={<IoMdCart size={SIDEBAR_ICON_SIZE}/>} label="CARTS">
            {
                carts.map((cart)=>{
                    return(
                        <Link to={'/carts'} key={uuid()}>
                            <MenuItem>{cart.store.id}</MenuItem>   
                        </Link>
                    )
                })
            }
            
        </SubMenu>
    )
}