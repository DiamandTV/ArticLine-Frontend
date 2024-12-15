import { Outlet } from "react-router-dom";
import { CartStore } from "../Cart/CartStore";

export function StoreBody(){
    return(
        <div className="w-full h-full flex">
            <div className="w-full col-span-2">
                <Outlet/>
            </div>
            <CartStore/>
        </div>
    )
}