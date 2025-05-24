import { OrderBusinessIntroCard } from "@features/order/components/cards/OrderCard"
import { OrderProvider } from "@features/order/context/OrderContext/OrderProvider"
import { useGetOrderBusinessListQuery } from "@features/order/hooks/useGetOrderBusinessListQuery/useGetOrderBusinessListQuery"
import { getKey } from "@lib/kegGenerator/keyGenerator"
import { PaddingView } from "@views/PaddingView"

export function OrderBusinessListPage(){
    const {data,isLoading,isSuccess} = useGetOrderBusinessListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <PaddingView className="w-full">
            {
                data.map((orderBusiness)=>{
                    return(
                        <OrderProvider  key={getKey()} order={orderBusiness}>
                            <OrderBusinessIntroCard/>
                        </OrderProvider>
                    )
                })
            }
        </PaddingView>
    )
}