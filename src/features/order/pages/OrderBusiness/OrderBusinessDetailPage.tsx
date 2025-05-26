import { CartProvider } from "@features/cart/context/CartContext/CartProvider"
import { Order } from "@features/order/compositions/Order"
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider"
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { PaddingView } from "@views/PaddingView"
export function OrderBusinessDetailPage(attr:React.HTMLAttributes<HTMLElement>){
    const {order} = useOrderContext()

        return(
            <div {...attr} className={tailwindMerge(" h-full",attr.className)}>
                <StoreProvider store={order.cart.store}>
                    <CartProvider cart={order.cart}>
                        <PaddingView className="w-full flex flex-row justify-end  items-center py-0">
                            <Order.StatusChip className="w-max float-left text-sm" />
                        </PaddingView>
                        <Order.OrderDetails/>
                        <Order.DeliveryDetails/>
                        <Order.TrackingDetails/>
                        <Order.DeliveryBatch/>
                    </CartProvider>
                </StoreProvider>
            </div>
        )
}