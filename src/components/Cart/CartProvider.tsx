// import { ReactNode, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { RootState } from "../../store/store";
// import { CartModel } from "../../models/Order";

// export function CartProvider({children}:{children:ReactNode}){
//     const params = useParams()
//     const carts = useSelector((state:RootState)=>state.cartsReducer.carts)
//     const thisCartId = params['cart-id']
//     const thisCart = thisCartId ? carts[thisCartId] : null
//     const [thisCart,setThiCart] = useState<CartModel|null>(thisCart)
    
    
//     return (
//         <Cart
//         thisCart ? children : null
//     )
// }