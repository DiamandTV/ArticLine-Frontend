import { useParams } from "react-router-dom"
import { LoaderQuery } from "../../loader/LoaderWithQueryAndChildren"
import { useOrderBatchDataService } from "../../../services/orderBatchData"
import { useEffect, useState } from "react"
import { OrderBatchDataProvider } from "../OrderBatchDataContext/OrderBatchDataProvider"
import { OrderBatchDataModel } from "../../../models/Order"
import { useFormContext } from "react-hook-form"
interface OrderBatchDataQueryProps{
    children:React.ReactNode
}

export function OrderBatchDataQuery({children}:OrderBatchDataQueryProps){
    const {watch} = useFormContext()
    console.log(watch('to_date_time'))
    const [orderBatchData,setOrderBatchData] = useState<OrderBatchDataModel[]>([])
    const params = useParams()
    //const activeOrderBatches = useSelector((state:RootState)=>state.orderReducer.companyActiveOrdersBatch)
    const orderBatchID = params['order-batch-id']
    if(!orderBatchID) return null
    //const orderBatch = activeOrderBatches.find((orderBatch)=>orderBatch.id?.toString() === orderBatchID)
    return(
        <LoaderQuery
            queryKey={['get-order-batch-data',watch('from_date_time'),watch('to_date_time')]}
            queryFn={async()=>await useOrderBatchDataService.getOrderBatchData({orderBatchID,from:watch('from_date_time'),to:watch('to_date_time')})}
            onSuccess={(data)=>{
                if(data.data){
                    console.log(data)
                    setOrderBatchData(data.data.results)
                }
            }}
            onError={()=>{

            }}
        >
            <OrderBatchDataProvider orderBatchData={orderBatchData} setOrderBatchData={setOrderBatchData}>
                {children}
            </OrderBatchDataProvider>
        </LoaderQuery>
    )    
}