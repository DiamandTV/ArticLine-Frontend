import { BlurCard } from "../../components/Cards/BlurCard";
import { CartCheckout } from "../../components/Cart/CartCheckout";
import { CartForm } from "../../components/Forms/CartForm";
import { OrderTimeInput } from "../../components/inputs/OrderTimeInput/OrderTimeInput";
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
            <div className="flex flex-row h-screen justify-between items-center gap-x-2">
            <BlurCard className="max-w-96">
                <CartForm/>
            </BlurCard>
            <CartCheckout/>
            </div>
        </MainView>
    )
}