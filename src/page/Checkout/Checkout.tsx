import { useSelector } from "react-redux";
import { BlurCard } from "../../components/Cards/BlurCard";
import { CartCheckout } from "../../components/Cart/CartCheckout";
import { CartForm } from "../../components/forms/CartForm";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
export function Checkout(){
    const params = useParams()
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)

    const thisCartId = params['cart-id']
    if (!thisCartId) return;
    const thisCart = carts.find((cart)=>cart.id==thisCartId)
    console.log(thisCart)
    return(
        thisCart ?
        <div className="w-full h-full flex flex-row justify-center items-center gap-x-2 border-l-2 border-gray-500 pl-2 ">
            <BlurCard className="flex flex-col h-full py-6">
                <CartForm/>
            </BlurCard>
            <CartCheckout />
        </div> : null
    )
}