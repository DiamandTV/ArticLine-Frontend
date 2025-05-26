import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { OrderBusinessIntroCard } from "@features/order/components/cards/OrderCard"
import { OrderProvider } from "@features/order/context/OrderContext/OrderProvider"
import { useGetOrderBusinessListQuery } from "@features/order/hooks/useGetOrderBusinessListQuery/useGetOrderBusinessListQuery"
import { getKey } from "@lib/kegGenerator/keyGenerator"
import { PaddingView } from "@views/PaddingView"
import { OrderBusinessDetailPage } from "./OrderBusinessDetailPage"

export function OrderBusinessListPage(){
    const {data,isLoading,isSuccess,ref} = useGetOrderBusinessListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <PaddingView className="w-full">
            {
                data.map((orderBusiness)=>{
                    return(
                        <OrderProvider  key={getKey()} order={orderBusiness}>
                            <BottomSheetModalProviderFn>
                                {
                                    ({setOpen})=>{
                                        return(
                                            <>
                                                <OrderBusinessIntroCard
                                                    onClick={()=>setOpen(true)}
                                                />
                                                <SimpleBottomSheetModal detent="content-height">
                                                    <OrderBusinessDetailPage/>
                                                </SimpleBottomSheetModal>
                                            </>
                                        )
                                    }
                                }
                            </BottomSheetModalProviderFn>
                        </OrderProvider>
                    )
                })
            }
            <div ref={ref} className="py-0.5"/>
        </PaddingView>
    )
}