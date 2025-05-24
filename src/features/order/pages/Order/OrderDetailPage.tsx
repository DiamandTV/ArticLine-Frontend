import { CartProvider } from "@features/cart/context/CartContext/CartProvider";
import { Order } from "@features/order/compositions/Order";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { PaddingView } from "@views/PaddingView";


type OrderCardProps = React.HTMLAttributes<HTMLElement>
export function OrderDetailPage(attr:OrderCardProps){
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
                </CartProvider>
            </StoreProvider>
        </div>
    )
}