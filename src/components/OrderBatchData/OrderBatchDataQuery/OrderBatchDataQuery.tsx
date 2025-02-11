import { useParams } from "react-router-dom"
import { LoaderQuery } from "../../loader/LoaderWithQueryAndChildren"
import { useOrderBatchDataService } from "../../../services/orderBatchData"
import { useContext, useEffect, useRef, useState } from "react"
import { OrderBatchDataProvider } from "../OrderBatchDataContext/OrderBatchDataProvider"
import { OrderBatchDataModel } from "../../../models/Order"
import { useFormContext } from "react-hook-form"
import { PaginationContext } from "../../Pagination/PaginationContext"
import { PaginationModel } from "../../../models/pagination"
interface OrderBatchDataQueryProps{
    children:React.ReactNode
}

export function OrderBatchDataQuery({children}:OrderBatchDataQueryProps){
    const first = useRef(true)
    const {watch} = useFormContext()
    console.log(watch('to_date_time'))
    const [orderBatchData,setOrderBatchData] = useState<OrderBatchDataModel[]>([])
    const params = useParams()
    const {page,setPage,setPageData} = useContext(PaginationContext)
    //const activeOrderBatches = useSelector((state:RootState)=>state.orderReducer.companyActiveOrdersBatch)
    useEffect(()=>{
        if(setPage && !first.current){
            setPage!(1)
        }
        first.current = false
    },[watch('from_date_time'),watch('to_date_time')])
    const orderBatchID = params['order-batch-id']
    if(!orderBatchID) return null
    //const orderBatch = activeOrderBatches.find((orderBatch)=>orderBatch.id?.toString() === orderBatchID)
    
    return(
        <LoaderQuery
            queryKey={['get-order-batch-data',page,watch('from_date_time'),watch('to_date_time')]}
            queryFn={async()=>await useOrderBatchDataService.getOrderBatchData({page, orderBatchID,from:watch('from_date_time'),to:watch('to_date_time')})}
            onSuccess={(data)=>{
                if(data.data){
                    console.log(data)
                    const pagination = structuredClone(data.data)
                    delete pagination.results
                    setPageData!(pagination as PaginationModel)
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