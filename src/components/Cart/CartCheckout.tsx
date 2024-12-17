import { useParams } from "react-router-dom";
import { CartCard } from "../Cards/CartCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function CartCheckout(){
    const params = useParams()
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    console.log(carts)
    const thisCartId = params['cart-id']
    if (!thisCartId) return;
    const thisCart = carts[thisCartId]
    return(
        thisCart ? 
        <>
        {/* 
            // todo:in the future when all the all is completed let the user modify the cart also in the checkout cart
                */}
            {/*<CartCard thisCart={thisCart} />*/}
        </>
        : null
    )
}