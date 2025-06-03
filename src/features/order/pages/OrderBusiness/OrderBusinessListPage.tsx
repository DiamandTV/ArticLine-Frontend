import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { OrderBusinessIntroCard } from "@features/order/components/cards/OrderCard"
import { OrderProvider } from "@features/order/context/OrderContext/OrderProvider"
import { useGetOrderBusinessListQuery } from "@features/order/hooks/useGetOrderBusinessListQuery/useGetOrderBusinessListQuery"
import { getKey } from "@lib/kegGenerator/keyGenerator"
import { OrderBusinessDetailPage } from "./OrderBusinessDetailPage"
import { useRef } from "react"
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider"

export function OrderBusinessListPage(){
    const divRef = useRef<HTMLDivElement|null>(null)
    const {data,isLoading,isSuccess,ref} = useGetOrderBusinessListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div className="flex flex-row h-full flex-nowrap mx-mb-df my-mb-df md:mx-df">
            <div className="w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
                {
                    data.map((orderBusiness)=>{
                        return(
                            <OrderProvider  key={getKey()} order={orderBusiness}>
                                <DivRefProvider divRef={divRef}>
                                    <BottomSheetModalProviderFn>
                                        {
                                            ({setOpen})=>{
                                                return(
                                                    <>
                                                        <OrderBusinessIntroCard className="h-max"
                                                            onClick={()=>setOpen(true)}
                                                        />
                                                        
                                                                <SimpleBottomSheetModal detent="content-height">
                                                                    <OrderBusinessDetailPage className="md:w-[500px]"/>
                                                                </SimpleBottomSheetModal>
                                                    
                                                    </>
                                                )
                                            }
                                        }
                                    </BottomSheetModalProviderFn>
                                </DivRefProvider>
                            </OrderProvider>
                        )
                    })
                }
                <div ref={ref} className="py-0.5"/>
            </div>
            <div ref={divRef} className="box-border h-full border-l-2 scrollbar-hide bg-surface-a0"></div>
        </div>
    )
}