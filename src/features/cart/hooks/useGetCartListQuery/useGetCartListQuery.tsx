import { CartInterface } from "@features/cart/model/Cart/Interface/CartInterface";
import { cartServices } from "@features/cart/services/cartServices";
import { useQuery } from "react-query";

export function useGetCartListQuery(){
    const queryOptions = useQuery({
        queryKey:[''],
        queryFn:async()=>await cartServices.list(),
    })

    if(queryOptions.isSuccess){
        return {...queryOptions,data:queryOptions.data.data as Array<CartInterface>}
    }

    return queryOptions
}