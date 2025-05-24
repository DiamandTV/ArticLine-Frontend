import { cartItemCacheKey } from "@features/cart/data/query";
import { CartItemInterface } from "@features/cart/model/CartItem/Interface/CartInterface";
import { cartItemServices } from "@features/cart/services/cartItemServices";
import { usePaginationInfiniteScroll } from "@hooks/PaginationInfiniteScroll/usePaginationInfiniteScroll";
import { getDataFromPage } from "@utils/getDataFromPage/getDataFromPaginationResponse";

interface useGetCartItemListQueryProps{
    cartId:number
}
export function useGetCartItemListQuery({cartId}:useGetCartItemListQueryProps){
    const paginationResults = usePaginationInfiniteScroll({
        queryKey:[cartItemCacheKey.list,cartId],
        queryFn:async({pageParam})=>await cartItemServices.list(cartId,pageParam)
    })

    if(paginationResults.isSuccess){
        console.log(paginationResults)
        return {...paginationResults,data:getDataFromPage<CartItemInterface>(paginationResults.data)}
    }
    return paginationResults
}