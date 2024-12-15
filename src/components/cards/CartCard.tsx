import { useDispatch } from "react-redux"
import { DeleteButton } from "../buttons/DeleteButton";
import { BlurCard } from "./BlurCard";
import { CartItem } from "../Cart/CartItem";
import {v4 as uuid} from "uuid"
import { deleteCart } from "../../store/cartsSlice";
//import { TextButton } from "../buttons/TextButtons";
import { CartModel } from "../../models/Order";
import { CardCartBottom } from "../Cart/CartCartBottom";
import { StoreModel } from "../../models/store";


interface CardCardProps{
    thisCart:CartModel,
    store?:StoreModel,
}
export function CartCard({thisCart,store}:CardCardProps){
    const dispatch = useDispatch()
    return(
        thisCart && thisCart ?
        <BlurCard className="bg-white rounded-xl max-h-max max-w-screen-sm sticky top-0">
            <div className="w-full h-14 flex flex-row justify-between">
                <h1 className="text-xl">CART</h1>
                {
                    store ? <DeleteButton
                        onClick={()=>{
                            dispatch(deleteCart({store}))
                        }
                    }
                    /> : null
                }
            </div>
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
            <CardCartBottom cart={thisCart} store={store}/>
        </BlurCard> : null
    )
}