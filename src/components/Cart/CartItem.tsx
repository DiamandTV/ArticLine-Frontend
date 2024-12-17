import { useState } from "react"
import { OrderItemModel } from "../../models/Order"
import { Counter } from "../inputs/Counter/Counter"
import { DeleteButton } from "../Buttons/DeleteButton"
import { useDispatch } from "react-redux"
import { deleteProductFromCart } from "../../store/cartsSlice"
import { StoreModel } from "../../models/store"
import { ProductModel } from "../../models/Product"
import { useCartService } from "../../services/cartService"

interface CartItemProps{
    orderItem:OrderItemModel,
    store?:StoreModel
}
export function CartItem({orderItem,store}:CartItemProps){
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const [counter,setCounter] = useState(orderItem.product_quantity)
    console.log((orderItem.product_item as ProductModel).name)
    return (
        <div className="w-full flex flex-col justify-between items-center border-b-2 py-2 last:border-b-0 border-slate-400 gap-y-2 cursor-pointer">
            <div 
                onClick={()=>{
                    setOpen(!open)
                }}
                className="w-full flex flex-row justify-between items-center px-2">
                <span className="font-mono">{orderItem.product_quantity}x</span>
                <span>{(orderItem.product_item as ProductModel).name}</span>
                <span>{(orderItem.product_item as ProductModel).price}$</span>
            </div>
            <div className={`w-full ${open ? 'max-h-10' : 'max-h-0'} overflow-hidden transition-all duration-500 ease-in-out ${store ? 'visible' : 'hidden'}`}>
                <div className="w-full h-10 flex flex-row justify-center items-center gap-x-2 relative">
                    <Counter
                        counter={counter}
                        setCounter={setCounter}
                        iconSize={12}
                        className="max-w-max text-lg gap-x-6"
                    />
                    <DeleteButton
                        className="max-h-max text-md rounded-full p-2 absolute right-0"
                        onClick={()=>{
                            // const data = useCartService.deleteCart({cart:thisC})
                            // dispatch(deleteProductFromCart({store,orderItem}))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}