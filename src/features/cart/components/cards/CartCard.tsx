import { Cart } from "@features/cart/compositions/Cart";
import { CartItem } from "@features/cart/compositions/CartItem";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";

export function CartCard() {
    const {cart} = useCartContext()
    if(!cart) return null
    return (
        <Cart.Card className="w-full">
            <Cart.Body className="p-2">
                <CartItem.List/>
            </Cart.Body>
        </Cart.Card>
    );
}
