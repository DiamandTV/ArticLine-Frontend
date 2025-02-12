import { useContext } from "react"
import { OrderBatchDataContext } from "../components/OrderBatchData/OrderBatchDataContext/OrderBatchDataContext"
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source"
import { HOST_URL } from "../constraints"
import { OrderBatchDataModel } from "../models/Order"
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
            setOrderBatchData((queue)=>{
                const data:OrderBatchDataModel = JSON.parse(evt.data)
                queue.addFIFO(data)
                return queue.clone()
            })
        }
    )

    return children
}