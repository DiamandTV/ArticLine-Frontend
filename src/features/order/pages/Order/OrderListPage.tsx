import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { OrderIntroCard } from "@features/order/components/cards/OrderCard"
import { OrderProvider } from "@features/order/context/OrderContext/OrderProvider"
import { useGetOrderListQuery } from "@features/order/hooks/useGetOrderListQuery/useGetListOrderQuery"
import { OrderDetailPage } from "./OrderDetailPage"
import { getKey } from "@lib/kegGenerator/keyGenerator"

export function OrderListPage(){
    const {data,isLoading,isSuccess,ref} = useGetOrderListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div className="bg-surface-a0 mx-mb-df my-mb-df md:mx-df grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
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
            <div className="py-0.5" ref={ref}/>
        </div>
        </div>
    )
}