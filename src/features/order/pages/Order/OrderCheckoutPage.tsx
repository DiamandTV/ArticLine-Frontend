import { DivRefProvider } from "@context/DivRefContext/DivRefProvider"
import { CartProvider } from "@features/cart/context/CartContext/CartProvider"
import { OrderCartCard } from "@features/order/components/cards/OrderCartCard"
import { OrderForm } from "@features/order/components/forms/Order/OrderForm"
import { RootState } from "@store/store"
import { PaddingView } from "@views/PaddingView"
import { useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

export function OrderCheckoutPage(){
    const divRef = useRef<HTMLDivElement|null>(null)
    // todo: simplify this page
    const params = useParams()
    //const storeId = params['store-id']
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    const cart = useMemo(()=>{
        return carts?.find(
            (_cart)=>
                _cart.store.id === Number(params['store-id']) && _cart.id === Number(params['cart-id']))
    },[carts])
    if(!cart) return
    return(
        <PaddingView className="w-full px-0 ">
            <CartProvider cart={cart}>
                <div className="flex flex-col w-full gap-2 p-2 md:flex-row bg-surface-a0 md:bg-surface-a20 ">
                    <div className="md:max-w-[600px] w-full">
                        <div className="w-full md:rounded-lg md:p-mb-df md:bg-surface-a0">
                            <OrderCartCard />
                        </div>
                    </div>
                    <div className="w-full md:rounded-lg md:p-mb-df md:bg-surface-a0">
                        <DivRefProvider divRef={divRef}>
                            <OrderForm.Create/>
                        </DivRefProvider>
                    </div>
                    <div ref={divRef} className="w-max scrollbar-hide"/>
                </div >
            </CartProvider>

        </PaddingView>
    )
}