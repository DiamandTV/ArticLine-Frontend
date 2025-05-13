//import { CartItemInterface } from "@features/cart/model/CartItem/Interface/CartInterface";
import { cartItemCacheKey } from "@features/cart/data/query";
import { cartItemServices } from "@features/cart/services/cartItemServices";
import { useQuery } from "react-query";

interface useGetCartItemQueryProps{
    cartId?:number,
    productId?:number,
}
export function useGetCartItemQuery({cartId,productId}:useGetCartItemQueryProps){
    const queryResults = useQuery({
        queryKey:[cartItemCacheKey.retrieve],
        queryFn:async()=>{
            if(cartId && productId){
                return await cartItemServices.retrieve(cartId,productId)
            }
            return Promise.reject()
        }
    })

    // if(queryResults.isSuccess){
    //     return {...queryResults,data:queryResults.data.data as CartItemInterface}
    // }
    return queryResults
}