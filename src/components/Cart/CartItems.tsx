import { CartModel } from "../../models/Order"
import { StoreModel } from "../../models/store"
import { CartItem } from "./CartItem"
import {v4 as uuid} from "uuid"
interface CartItems{
    thisCart:CartModel,
    store?:StoreModel,
}
export function CartItems({thisCart,store}:CartItems){
    return ( 
        <div className="w-full flex flex-col my-4 border-2 border-slate-400 rounded-xl p-2 max-h-96 overflow-y-scroll scrollbar-hide">
            {/* 
                //todo: maybe it's better to use fized list of react window
            */}
            {
                Object.values(thisCart).map((orderItem)=>{
                    console.log(orderItem)
                    return (
                        <>
                            <CartItem key={uuid()} orderItem={orderItem} store={store}/>
                        </>
                    )
                })
            }
        </div>
    )
}