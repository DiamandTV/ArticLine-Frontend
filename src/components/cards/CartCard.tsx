import { BlurCard } from "./BlurCard";
//import { TextButton } from "../Buttons/TextButtons";
import { CartModel } from "../../models/cart";
import { CardCartBottom } from "../Cart/CartCartBottom";
import { StoreModel } from "../../models/store";
import { CartItems } from "../Cart/CartItems";
import { DeleteCartButton } from "../buttons/DeleteCartButton";

interface CardCardProps{
    thisCart:CartModel,
    store?:StoreModel,
}
export function CartCard({thisCart,store}:CardCardProps){
    return(
        thisCart && thisCart ?
        <BlurCard className="bg-white rounded-xl max-h-max sticky top-0 max-w-sm">
            <div className="w-full h-14 flex flex-row justify-between">
                <h1 className="text-xl">CART</h1>
                {
                    store ? <DeleteCartButton thisCart={thisCart}/> : null
                }
               
            </div>
            <CartItems thisCart={thisCart} store={store}/>
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