import { Outlet } from "react-router-dom";
import { CartStore } from "../Cart/CartStore";

export function StoreBody(){
    return(
        <div className="w-full h-full flex flex-row flex-nowrap gap-x-2">
            <div className="w-full">
                <Outlet/>
            </div>
            <CartStore/>
        </div>
    )
}