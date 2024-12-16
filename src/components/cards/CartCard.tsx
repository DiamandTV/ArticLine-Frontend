import { useDispatch } from "react-redux"
import { DeleteButton } from "../buttons/DeleteButton";
import { BlurCard } from "./BlurCard";

import { deleteCart } from "../../store/cartsSlice";
//import { TextButton } from "../buttons/TextButtons";
import { CartModel } from "../../models/Order";
import { CardCartBottom } from "../Cart/CartCartBottom";
import { StoreModel } from "../../models/store";
import { CartItems } from "../Cart/CartItems";


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
                <CartItems thisCart={thisCart} store={store}/>
            </div>
           
            <CardCartBottom cart={thisCart} store={store}/>
        </BlurCard> : null
    )
}

export function CartListCard({thisCart,store}:CardCardProps){
    return(
        <BlurCard className="bg-white rounded-xl max-h-max max-w-screen-sm ">
            <div className="w-full flex flex-row justify-between">
                
            </div>
        </BlurCard>
    )
}