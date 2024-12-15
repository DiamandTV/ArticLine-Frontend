import { useSelector } from "react-redux";
import { CartCard } from "../cards/CartCard"
import { RootState } from "../../store/store";
import { CartModel } from "../../models/Order";

export function CartStore(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const cart = useSelector((state:RootState)=>state.cartsReducer.carts)
    if(!cart || !store) return;
    const thisCart = cart[store.id] as CartModel
    return <CartCard store={store} thisCart={thisCart}/>
}