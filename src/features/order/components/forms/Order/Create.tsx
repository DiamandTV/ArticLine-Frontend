import { Button } from "react-bootstrap";
import { OrderInfoFields, OrderInfoFieldsProvider } from "../../fields/Order/OrderFields";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";

export function Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <OrderInfoFieldsProvider>
                <OrderInfoFields/>
                <CreateButton/>
            </OrderInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const {cart} = useCartContext()
    if(!cart) return null
    const total = cart.subtotal_cost + cart.shipping_cost
    return (
        <Button>{`PLACE THIS ORDER | ${total}`}</Button>
    )
}