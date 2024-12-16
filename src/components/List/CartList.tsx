import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { CartListCard } from "../Cards/CartCard"

export function CartList(){
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    if(!carts) return
    return(
        <div className="w-full flex flex-col justify-start gap-y-2">
            {Object.entries(carts).map(([_,value])=>{
                return(
                    <CartListCard thisCart={value}/> 
                )
            })}
        </div>
    )
}