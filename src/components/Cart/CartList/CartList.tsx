import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { CartListItem } from "./CartListItem"

export function CartList(){
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    if(!carts) return
    return(
        <div className="w-full flex flex-col justify-start gap-y-2">
           {carts.map((cart)=>{
                return(
                    <CartListItem cart={cart}/>
                )
           })}
        </div>
    )
}