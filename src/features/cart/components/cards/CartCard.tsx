import { Cart } from "@features/cart/compositions/Cart";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";

export function CartCard() {
    const {cart} = useCartContext()
    if(!cart) return null
    return (
        <Cart.Card>
            <Cart.Header />
            <Cart.Footer />
        </Cart.Card>
    );
}
