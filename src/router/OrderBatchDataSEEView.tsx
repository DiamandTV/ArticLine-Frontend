import { useContext } from "react"
import { OrderBatchDataContext } from "../components/OrderBatchData/OrderBatchDataContext/OrderBatchDataContext"
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source"
import { HOST_URL } from "../constraints"

interface OrderBatchDataSEEViewProps{
    orderBatchDataId:string|number,
    children:React.ReactNode
}

export function OrderBatchDataSEEView({orderBatchDataId,children}:OrderBatchDataSEEViewProps){
    const {setOrderBatchData} = useContext(OrderBatchDataContext)
    const [eventSource/*,eventSourceStatus*/] = useEventSource(`${HOST_URL}/events/listener/orderBatchData_${orderBatchDataId}`,true)
    
    useEventSourceListener(
        eventSource,
        ['NEW ORDER BATCH DATA'],
        (evt)=>{
            setOrderBatchData(evt)
        }
    )

    return children
}