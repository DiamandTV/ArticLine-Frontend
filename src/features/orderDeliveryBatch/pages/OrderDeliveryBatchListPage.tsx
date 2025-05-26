import { PaddingView } from "@views/PaddingView"
import { useGetOrderDeliveryBatchListQuery } from "../hooks/useGetOrderDeliveryBatchListQuery.tsx/useGetOrderDeliveryBatchListQuery"
import { OrderDeliveryBatchProvider } from "../context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider"

export function OrderDeliveryBatchListPage(){
    const {data,isLoading,isSuccess,ref} = useGetOrderDeliveryBatchListQuery()
    if (isLoading || !isSuccess) return null
    return(
        <PaddingView>
            {
                data.map((orderDeliveryBatch)=>{
                    return(
                        <OrderDeliveryBatchProvider orderDeliveryBatch={orderDeliveryBatch}>
                            <div></div>
                        </OrderDeliveryBatchProvider>
                    )
                })
            }
            <div className="py-0.5" ref={ref}/>
        </PaddingView>
    )
}