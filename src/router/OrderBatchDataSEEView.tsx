import { useContext } from "react"
import { OrderBatchDataContext } from "../components/OrderBatchData/OrderBatchDataContext/OrderBatchDataContext"
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source"
import { FIFO_QUEUE_SIZE, HOST_URL } from "../constraints"
import { OrderBatchDataModel } from "../models/Order"
import { useParams } from "react-router-dom"
import { FIFOQueue } from "../utlis/moduls/fifo"
import { PaginationContext } from "../components/Pagination/PaginationContext"
interface OrderBatchDetailSEEViewProps{
    orderBatchDataId?:string|number,
    children?:React.ReactNode
}

export function OrderBatchDetailSEEView({orderBatchDataId,children}:OrderBatchDetailSEEViewProps){
    const params = useParams()
    if(!orderBatchDataId){
        orderBatchDataId = params['order-batch-id']
    }
    const {setOrderBatchData} = useContext(OrderBatchDataContext)
    const {page_size} = useContext(PaginationContext)
    const [eventSource/*,eventSourceStatus*/] = useEventSource(`${HOST_URL}/events/listener/order_batch_${orderBatchDataId}`,true)
    

    useEventSourceListener(
        eventSource,
        ['NEW ORDER BATCH DATA'],
        (evt)=>{
            console.warn(evt)
            setOrderBatchData((queue)=>{
                const data:OrderBatchDataModel = JSON.parse(evt.data)
                return new FIFOQueue(page_size ?? FIFO_QUEUE_SIZE,[...queue.queue,data]);
            })
        }
    )

    useEventSourceListener(
        eventSource,
        ['NEW ORDER BATCH POSITION'],
        (evt)=>{
            console.log(evt)
        }
    )

    
    if(!orderBatchDataId) return
    return children
}