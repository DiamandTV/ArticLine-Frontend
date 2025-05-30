import { useSelector } from "react-redux";
import { CartItemContext } from "./CartItemContext";
import { RootState } from "@store/store";
import { useProductContext } from "@features/store/context/ProductContext/ProductProvider";
import { useGetCartItemQuery } from "@features/cart/hooks/useGetCartItemQuery/useGetCartItemQuery";
import { useContext, useMemo } from "react";
import { CartItemInterface } from "@features/cart/model/CartItem/Interface/CartInterface";

interface CartItemQueryProviderProps {
    children:React.ReactNode
}
export function CartItemQueryProvider({children}:CartItemQueryProviderProps){
    const {product} = useProductContext()
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    
    const cart = useMemo(()=>{
        return carts.find((_cart)=>{
            if(_cart?.store?.id === product?.store_category.store?.id){
             return true
            }  
         })
    },[carts])

    const {data,isSuccess,isLoading} = useGetCartItemQuery({
        cartId:cart?.id,
        productId:product.id
    })


    return(
        isLoading ? <div></div> : 
        <CartItemContext.Provider value={{cartItem:isSuccess ? data?.data : undefined}}>
            {children}
        </CartItemContext.Provider>
    )
}

export function CartItemProvider({cartItem,children}:CartItemQueryProviderProps & {cartItem:CartItemInterface}){
    return(
        <CartItemContext.Provider value={{cartItem}}>
            {children}
        </CartItemContext.Provider>
    )
}

export function useCartItemContext(){
    const context = useContext(CartItemContext)
    if(context){
        return context
    }
    throw new Error('useCarItemContext can only be used within the CartItemProvider')
}