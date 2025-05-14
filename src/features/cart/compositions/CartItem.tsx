import { useCartContext } from "../context/CartContext/CartProvider"
import { CartItemProvider, useCartItemContext } from "../context/CartItemContext/CartItemProvider"
import { useGetCartItemListQuery } from "../hooks/useGetCartItemListQuery/useGetCartItemListQuery"
import { getKey } from "@lib/kegGenerator/keyGenerator"
import { CartItemForm } from "../components/forms/CartItemForm/CartItemForm"


export const CartItem = ()=>null


CartItem.ItemCard = function ItemCard(){
    return(
        <div className="w-full h-full flex flex-row gap-2 justify-between items-center">
            <CartItem.Image/>
            <div className="w-max flex flex-col items-start justify-center ">
                <CartItem.Title/>
                <CartItem.Category/>
            </div>
            <CartItem.UpdateItem/>
            <CartItem.Price/>
            <CartItem.DeleteItem/>
        </div>
    )
}

CartItem.Image = function Image(){
    const {cartItem} = useCartItemContext()
    const className = 'h-16 w-20 rounded-lg bg-cover bg-center transition-transform duration-300 hover:scale-105'
    return(
        <div
            className={className}
            style={{ backgroundImage: `url(${cartItem?.product_item.image})` }}
        />
    )
}

CartItem.Title = function Title(){
    const title = useCartItemContext().cartItem?.product_item.name
    return(
        <h1 className="font-semibold">{title}</h1>
    )
}

CartItem.Category = function Category(){
    const category = useCartItemContext().cartItem?.product_item.store_category.name
    return(
        <span className="font-thin text-xs">{category}</span>
    )
}

CartItem.Price = function Price(){
    const {cartItem} = useCartItemContext()
    const quantity = cartItem?.product_quantity
    const singlePrice = cartItem?.product_item.price
    if(quantity === undefined || singlePrice === undefined) return null
    const totalItemPrice = quantity * singlePrice
    return (
        <div className="flex flex-row gap-1 justify-center items-center">
            <span className="font-light text-sm">{`€`}</span>
            <span className="font-semibold text-base">{`${totalItemPrice}`}</span>
        </div>
    ) 
}

CartItem.UpdateItem = function UpdateItem(){
    return(
        <div className="w-24 flex flex-row justify-center items-center">
            <CartItemForm.Update className="max-w-20 w-full text-xs"/>
        </div>
    )
}
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont"
CartItem.DeleteItem = function DeleteItem(){
    return(
        <DeleteLabelButton
            text=""
            className="bg-transparent "
            iconClassName="text-lg"
        />
    )
}

CartItem.List = function List(){
    console.log("OK")
    const {cart} = useCartContext()
    const {data,isLoading,isSuccess,ref} = useGetCartItemListQuery({
        cartId:cart!.id
    })

    if(isLoading || !isSuccess) return null

    return (
        <div className="flex flex-col gap-2">
            
            {data.map((cartItem,index)=>{
                return(    
                    <>
                        <CartItemProvider key={getKey()} cartItem={cartItem}>
                                
                            <CartItem.ItemCard/>
                            {
                                index +1 !== data.length ? <hr /> : null
                            }      
                        </CartItemProvider>
                    </>
                )
            })}
            <div ref={ref} className="py-0.5" ></div>
        </div>
    )
}