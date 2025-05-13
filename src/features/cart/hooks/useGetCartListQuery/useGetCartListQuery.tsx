import { cartCacheKey } from "@features/cart/data/query";
import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";
import { cartServices } from "@features/cart/services/cartServices";
import { useQuery } from "react-query";

export function useGetCartListQuery(){
    const queryResults = useQuery({
        queryKey:[cartCacheKey.list],
        queryFn:async()=>await cartServices.list(),
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        refetchOnReconnect:true
    })

    if(queryResults.isSuccess){
        return {...queryResults,data:queryResults.data.data as Array<CartInterface>}
    }

    return queryResults
}