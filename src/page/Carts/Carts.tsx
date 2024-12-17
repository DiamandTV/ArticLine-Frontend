import { Outlet } from "react-router-dom";
import { CartList } from "../../components/Cart/CartList/CartList";
import { CartsQuery } from "../../components/Cart/CartsQuery";

// !! Carts list
export function Carts(){
    return(
        <CartsQuery>
            <div className="w-full h-full flex flex-row gap-x-2 justify-start items-start">
                <div className="w-1/2">
                    {/* list of the carts */}
                    <CartList/>
                </div>
                <div className="w-1/2 h-full">
                    <Outlet/>
                </div>
            </div>
        </CartsQuery>
    )
}