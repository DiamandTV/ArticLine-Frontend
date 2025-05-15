import { RootState } from "@store/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CartProvider } from "../context/CartContext/CartProvider";
import { CartCard } from "../components/cards/CartCard";
import { PaddingView } from "@views/PaddingView";

export function CartPage(){
    const params = useParams()
    //const storeId = params['store-id']
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    const cart = useMemo(()=>{
        return carts?.find(
            (_cart)=>
                _cart.store.id === Number(params['store-id']) && _cart.id === Number(params['cart-id']))
    },[carts])
    return (
        <PaddingView className="p-0">
            <CartProvider cart={cart}>
                <CartCard />
            </CartProvider>
        </PaddingView>
    )
}