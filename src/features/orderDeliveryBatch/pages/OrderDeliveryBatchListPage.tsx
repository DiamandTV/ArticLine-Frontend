import { useGetOrderDeliveryBatchListQuery } from "../hooks/useGetOrderDeliveryBatchListQuery.tsx/useGetOrderDeliveryBatchListQuery"
import { OrderDeliveryBatchProvider } from "../context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider"
import { OrderDeliveryBatchCard } from "../components/cards/OrderDeliveryBatchCard"
import { useRef } from "react"
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider"

export function OrderDeliveryBatchListPage(){
    const divRef = useRef<HTMLDivElement|null>(null)
    const {data,isLoading,isSuccess,ref} = useGetOrderDeliveryBatchListQuery()
    
    return(
        <div className="flex flex-row h-full flex-nowrap mx-mb-df my-mb-df md:mx-df">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-2">            
                    <DivRefProvider divRef={divRef}>
                        {
                            (!isLoading && isSuccess) && data.map((orderDeliveryBatch)=>{
                                return(
                                    <OrderDeliveryBatchProvider key={orderDeliveryBatch.id} orderDeliveryBatch={orderDeliveryBatch}>
                                        <OrderDeliveryBatchCard/>
                                    </OrderDeliveryBatchProvider>
                                )
                            })
                        }
                    </DivRefProvider>
                <div className="w-full py-0.5" ref={ref}/>
            </div>
            <div ref={divRef} className="flex flex-col h-full gap-2 w-max scrollbar-hide"></div>
        </div>
    )
}