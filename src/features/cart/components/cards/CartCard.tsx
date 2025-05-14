import { BackButton } from "@components/buttons/BackButton/BackButton";
import { Cart } from "@features/cart/compositions/Cart";
import { CartItem } from "@features/cart/compositions/CartItem";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { StoreIntroCard } from "@features/store/components/cards/StoreCard/StoreIntroCard";

export function CartCard() {
    const {cart} = useCartContext()
    if(!cart) return null
    return (
        <Cart.Card className="w-full">
            <Cart.Header className="px-2 py-3 flex flex-row justify-between items-center ">
                <div className="w-max flex flex-row items-center gap-2">
                    <BackButton className="text-lg p-2"/>
                    <h1 className="text-lg font-semibold text-surface-30">Continue shopping</h1>
                </div>
                <Cart.ItemsCount/>
           
            </Cart.Header>
            <Cart.Body className="flex flex-col gap-2 p-2 pb-0">
                
                <CartItem.List/>
            </Cart.Body>
            <Cart.Footer className="mt-0">
                <Cart.PriceDetails/>
            </Cart.Footer>
        </Cart.Card>
    );
}
