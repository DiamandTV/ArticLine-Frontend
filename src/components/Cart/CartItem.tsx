import { useContext, useState } from "react"
import { OrderItemModel } from "../../models/Order"
import { Counter } from "../inputs/Counter/Counter"
import { DeleteButton } from "../Buttons/DeleteButton"
import { ProductModel } from "../../models/Product"
import { useOrderItemService } from "../../services/orderItemService"
import { useCartService } from "../../services/cartService"
import { deleteOrderItemFromCart } from "../../store/cartsSlice"
import { useDispatch } from "react-redux"
import { CartContext } from "./CartProvider/CartContext"
import { IconButton } from "../buttons/IconButton"
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
export function CartItem({orderItem}:{orderItem:OrderItemModel}){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cart,classNames:{productClassName,deleteProductButtonClassName,counterClassName,detailsClassName}} = useContext(CartContext)
    const [open,setOpen] = useState(true)
    const [counter,setCounter] = useState(orderItem.product_quantity)

    const onChangeQuantity = (orderItem:OrderItemModel)=>{
        const data = useOrderItemService.updateOrderItem({orderItem})
        if(data){
            console.log(data)
        }
    }
    return (
        cart ? 
        <div className="w-full flex flex-col justify-between items-center border-b-2 py-2 last:border-b-0 border-slate-400 gap-y-2 cursor-pointer">
            <div 
                onClick={()=>{
                    setOpen(!open)
                }}
                className="w-full flex flex-row justify-between items-center px-2">
                <span className="font-mono">{counter}x</span>
                <div className="w-full flex flex-col justify-center items-center px-4">
                    <span className="block text-[18px] font-medium ">{(orderItem.product_item as ProductModel).name}</span>
                    <p style={{display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical"}} className="text-center text-sm font-thin text-ellipsis overflow-clip whitespace-normal">{(orderItem.product_item as ProductModel).description}</p>
                </div>
                <span>{(orderItem.product_item as ProductModel).price}$</span>
            </div>
            <div className={`w-full ${open ? 'max-h-10' : 'max-h-0'} overflow-hidden transition-all duration-500 ease-in-out `}>
                <div className={"w-full h-10 flex flex-row justify-between items-center gap-x-2 relative "+detailsClassName}>
                    <IconButton
                        className={"bg-green-700 max-h-max text-md rounded-full p-2 " + productClassName}
                        icon={<AiFillProduct/>}
                        onClick={()=>{
                            navigate(`/store/details/${cart.store}/sub-category/${(orderItem.product_item as ProductModel).id}`)
                        }}
                    />
                    <Counter
                        counter={counter}
                        setCounter={(counter:number)=>{
                            // update the orderItem
                            const order_item:OrderItemModel = {...orderItem,product_item:(orderItem.product_item as ProductModel).id!,product_quantity:counter}
                            onChangeQuantity(order_item)
                            setCounter(counter)
                        }}
                        iconSize={12}
                        className={"max-w-max text-lg gap-x-6 " +counterClassName}
                    />
                    <DeleteButton
                        className={"max-h-max text-md rounded-full p-2 " +deleteProductButtonClassName}
                        onClick={async ()=>{
                            // const data = useCartService.deleteCart({cart:thisC})
                            // dispatch(deleteProductFromCart({store,orderItem}))
                            const data = await useOrderItemService.deleteOrderItem({orderItem})
                            if(data){
                                // delete the item from the cart in the store
                                const _cart = useCartService.removeItem({cart,orderItem})
                                console.log(_cart)
                                dispatch(deleteOrderItemFromCart(_cart))
                            }
                            
                        }}
                    />
                </div>
            </div>
        </div> : null
    )
}