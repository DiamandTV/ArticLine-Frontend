import { Card } from "react-bootstrap"
import { useCartContext } from "../context/CartContext/CartProvider"
import { CartItemProvider, useCartItemContext } from "../context/CartItemContext/CartItemProvider"
import { useGetCartItemListQuery } from "../hooks/useGetCartItemListQuery/useGetCartItemListQuery"

export const CartItem = ()=>null

CartItem.ItemCard = function ItemCard(){
    const {cartItem} = useCartItemContext()
    return(
        <div>
            <h1>{cartItem?.product_item.name}</h1>
        </div>
    )
}

CartItem.List = function List(){
    const {cart} = useCartContext()
    const {data,isLoading,isSuccess,ref} = useGetCartItemListQuery({
        cartId:cart!.id
    })

    if(isLoading || !isSuccess) return null

    return (
        <div>
            {data.map((cartItem)=>{
                return(
                    <CartItemProvider cartItem={cartItem}>
                        <CartItem.ItemCard/>
                    </CartItemProvider>
                )
            })}
            <div className="py-1" ref={ref}/>
        </div>
    )
}