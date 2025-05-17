import { CartProvider } from "@features/cart/context/CartContext/CartProvider"
import { OrderForm } from "@features/order/components/forms/Order/OrderForm"
import { RootState } from "@store/store"
import { PaddingView } from "@views/PaddingView"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

export function OrderCheckoutPage(){
    // todo: simplify this page
    const params = useParams()
    //const storeId = params['store-id']
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    const cart = useMemo(()=>{
        return carts?.find(
            (_cart)=>
                _cart.store.id === Number(params['store-id']) && _cart.id === Number(params['cart-id']))
    },[carts])
    
    return(
        <PaddingView className="px-0 ">
            <div className="bg-surface-a0 p-2">
                <OrderForm.Create/>
            </div>

        </PaddingView>
    )
}