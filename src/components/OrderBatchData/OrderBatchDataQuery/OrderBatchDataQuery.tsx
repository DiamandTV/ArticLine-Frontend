import { useParams } from "react-router-dom"
import { LoaderQuery } from "../../loader/LoaderWithQueryAndChildren"
import { useOrderBatchDataService } from "../../../services/orderBatchData"
import React, { useContext, useEffect, useRef, useState } from "react"
import { OrderBatchDataProvider } from "../OrderBatchDataContext/OrderBatchDataProvider"
import { OrderBatchDataModel } from "../../../models/Order"
import { useFormContext } from "react-hook-form"
import { PaginationContext } from "../../Pagination/PaginationContext"
import { PaginationModel } from "../../../models/pagination"
import { FIFOQueue } from "../../../utlis/moduls/fifo"
import { FIFO_QUEUE_SIZE } from "../../../constraints"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
interface OrderBatchDataQueryProps{
    children:React.ReactNode
}

export function OrderBatchDataQuery({children}:OrderBatchDataQueryProps){
    const first = useRef(true)
    const params = useParams()
    const {watch} = useFormContext()
    const [orderBatchData,setOrderBatchData] = useState<FIFOQueue<OrderBatchDataModel>>(new FIFOQueue<OrderBatchDataModel>(FIFO_QUEUE_SIZE))
    const {page,setPage,page_size,setPageData} = useContext(PaginationContext)
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
            loading={false}
            queryKey={['get-order-batch-data',page,page_size,watch('from_date_time'),watch('to_date_time')]}
            queryFn={async()=>await useOrderBatchDataService.getOrderBatchData({page,page_size,orderBatchID,from:watch('from_date_time'),to:watch('to_date_time')})}
            onSuccess={(data)=>{
                if(data.data){
                    console.log(data)
                    const pagination = structuredClone(data.data)
                    delete pagination.results
                    setPageData!(pagination as PaginationModel)
                    setOrderBatchData(new FIFOQueue(FIFO_QUEUE_SIZE,data.data.results))
                }
            }}
            onError={()=>{

            }}
        >
            <OrderBatchDataQuery.PageSizeChanger>
                <OrderBatchDataProvider orderBatchData={orderBatchData} setOrderBatchData={setOrderBatchData}>
                    {children}
                </OrderBatchDataProvider>
            </OrderBatchDataQuery.PageSizeChanger>
        </LoaderQuery>
    )    
}

OrderBatchDataQuery.PageSizeChanger = function PageSizeChanger({children}:{children:React.ReactNode }){
    //todo: migliorare gli cambiamenti del page size. NON CARICARE OGNI VOLTA I DATI DAL SERVER QUANDO SI HA UN CAMBIO DI MEDIA QUERY
    const isMD = useMediaQuery({query:'(40rem < width < 64rem)'})
    const isLG = useMediaQuery({query:'(width > 64rem)'})  
    const isSM =   useMediaQuery({query:'(width <= 40rem)'}) 
    const {setPageSize} = useContext(PaginationContext)
    useEffect(()=>{
        if(!setPageSize) return
        switch(true){
            case isLG:
                setPageSize(200)
                break
            case isMD:
                setPageSize(100)
                break
            case isSM:
                setPageSize(50)
                break
            
        }
    },[isSM,isMD,isLG])
    return(
        <>
            {children}
        </>
    )
}