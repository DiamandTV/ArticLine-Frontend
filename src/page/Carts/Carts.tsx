import { Outlet } from "react-router-dom";
import { CartList } from "../../components/List/CartList";

// !! Carts list
export function Carts(){
    return(
        <div className="w-full flex flex-row justify-start items-start">
            <div>
                {/* list of the carts */}
                <CartList/>
            </div>
            <Outlet/>
        </div>
    )
}