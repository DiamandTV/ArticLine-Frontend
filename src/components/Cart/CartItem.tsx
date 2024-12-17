import { useState } from "react"
import { OrderItemModel } from "../../models/Order"
import { Counter } from "../inputs/Counter/Counter"
import { DeleteButton } from "../Buttons/DeleteButton"
import { StoreModel } from "../../models/store"
import { ProductModel } from "../../models/Product"
import { useOrderItemService } from "../../services/orderItemService"
import { CartModel } from "../../models/cart"
import { useCartService } from "../../services/cartService"
import { deleteOrderItemFromCart } from "../../store/cartsSlice"
import { useDispatch } from "react-redux"

interface CartItemProps{
    orderItem:OrderItemModel,
    thisCart:CartModel,
    store?:StoreModel
}
export function CartItem({orderItem,store,thisCart}:CartItemProps){
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const [counter,setCounter] = useState(orderItem.product_quantity)

    const onChangeQuantity = (orderItem:OrderItemModel)=>{
        const data = useOrderItemService.updateOrderItem({orderItem})
        if(data){
            console.log(data)
        }
    }

    return (
        <div className="w-full flex flex-col justify-between items-center border-b-2 py-2 last:border-b-0 border-slate-400 gap-y-2 cursor-pointer">
            <div 
                onClick={()=>{
                    setOpen(!open)
                }}
                className="w-full flex flex-row justify-between items-center px-2">
                <span className="font-mono">{counter}x</span>
                <span>{(orderItem.product_item as ProductModel).name}</span>
                <span>{(orderItem.product_item as ProductModel).price}$</span>
            </div>
            <div className={`w-full ${open ? 'max-h-10' : 'max-h-0'} overflow-hidden transition-all duration-500 ease-in-out ${store ? 'visible' : 'hidden'}`}>
                <div className="w-full h-10 flex flex-row justify-center items-center gap-x-2 relative">
                    <Counter
                        counter={counter}
                        setCounter={(counter:number)=>{
                            // update the orderItem
                            const order_item:OrderItemModel = {...orderItem,product_item:(orderItem.product_item as ProductModel).id!,product_quantity:counter}
                            onChangeQuantity(order_item)
                            setCounter(counter)
                        }}
                        iconSize={12}
                        className="max-w-max text-lg gap-x-6"
                    />
                    <DeleteButton
                        className="max-h-max text-md rounded-full p-2 absolute right-0"
                        onClick={async ()=>{
                            // const data = useCartService.deleteCart({cart:thisC})
                            // dispatch(deleteProductFromCart({store,orderItem}))
                            const data = await useOrderItemService.deleteOrderItem({orderItem})
                            if(data){
                                // delete the item from the cart in the store
                                const cart = useCartService.removeItem({cart:thisCart,orderItem})
                                console.log(cart)
                                dispatch(deleteOrderItemFromCart(cart))
                            }
                            
                        }}
                    />
                </div>
            </div>
        </div>
    )
}