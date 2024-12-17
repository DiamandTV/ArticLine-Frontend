import { useSelector } from "react-redux";
import { CartCard } from "../Cards/CartCard"
import { RootState } from "../../store/store";
import { CartModel } from "../../models/Order";

export function CartStore(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
    if(!carts || !store) return;
    const thisCart = carts.find((cart)=>cart.store === store.id)
    console.log(thisCart)
    return thisCart ? <CartCard store={store} thisCart={thisCart}/> : null
}