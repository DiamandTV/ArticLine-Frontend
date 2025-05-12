import { useGetCartListQuery } from "@features/cart/hooks/useGetCartListQuery/useGetCartListQuery"
import { cartSliceActions } from "@features/cart/slice/cartSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

interface CartProviderProps{
    children:React.ReactNode
}
export function CartProvider({children}:CartProviderProps){
    const dispatch = useDispatch()
    const {data} = useGetCartListQuery()
    useEffect(()=>{
        dispatch(cartSliceActions.setCarts(data))
    },[data])
    return children
}