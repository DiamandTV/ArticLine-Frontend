import { CartCheckout } from "../../components/Cart/CartCheckout";
import { NavBar } from "../../layouts/NavBar/NavBar";
import { NavBarType } from "../../layouts/NavBar/NavBarTypes";
import { MainView } from "../../views/MainView";

export function Checkout(){
    return(
        <MainView>
            <NavBar
                type={NavBarType.ONLY_TITLE}
            />
            <hr className="bg-gray-600 border-gray-500 " />
            <div className="grid grid-cols-3 h-screen justify-center items-center gap-x-2">
                <div className="w-full col-span-2 border-r-2 border-gray-500">
                    
                </div>
                
                <CartCheckout/>
            </div>
        </MainView>
    )
}