import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { OrderIntroCard } from "@features/order/components/cards/OrderCard"
import { OrderProvider } from "@features/order/context/OrderContext/OrderProvider"
import { useGetOrderListQuery } from "@features/order/hooks/useGetOrderListQuery/useGetListOrderQuery"
import { PaddingView } from "@views/PaddingView"
import { OrderDetailPage } from "./OrderDetailPage"
import { getKey } from "@lib/kegGenerator/keyGenerator"

export function OrderListPage(){
    const {data,isLoading,isSuccess} = useGetOrderListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <PaddingView className="w-full">
            <div className="w-full">
            {
                data.map((order)=>{
                    return(
                        <OrderProvider order={order}>
                            <BottomSheetModalProviderFn>
                                {
                                    ({setOpen})=>{
                                        return(
                                            <>
                                                <OrderIntroCard key={getKey()} onClick={()=>setOpen(true)}/>
                                                <SimpleBottomSheetModal detent="content-height">
                                                    <OrderDetailPage key={getKey()}/>
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
        </div>
        </PaddingView>
    )
}