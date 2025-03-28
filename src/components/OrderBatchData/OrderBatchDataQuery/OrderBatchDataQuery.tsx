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
import { Dayjs } from "dayjs"
import { AxiosResponse } from "axios"
import { useOrderDataService } from "../../../services/orderData"
interface OrderBatchDataQueryProps{
    id:string|number,
    queryFn:(params:{id:number|string,page_size?:number,page?:string|number,from?:Dayjs,to?:Dayjs}) => Promise<AxiosResponse>,
    children:React.ReactNode,
}

export function OrderDataQuery({children}:{children:React.ReactNode}){
    const params = useParams()
    const orderId = params['order-id']
    if(!orderId) return null
    return (
        <OrderBatchDataQueryDef 
            id={orderId} 
            queryFn={ async({id,page,page_size,from,to})=> await useOrderDataService.getOrderData({orderID:id,page,page_size,from,to})}
            >
            {children}
        </OrderBatchDataQueryDef>
    )
}

export function OrderBatchDataQuery({children}:{children:React.ReactNode}){
    const params = useParams()
    const orderBatchId = params['order-batch-id']
    if(!orderBatchId) return null
    return (
        <OrderBatchDataQueryDef 
            id={orderBatchId} 
            queryFn={ async({id,page,page_size,from,to})=> await useOrderBatchDataService.getOrderBatchData({orderBatchID:id,page,page_size,from,to})}
            >
            {children}
        </OrderBatchDataQueryDef>
    )
}

function OrderBatchDataQueryDef({id,queryFn,children}:OrderBatchDataQueryProps){
    const first = useRef(true)
    const {watch} = useFormContext()
    const {page,setPage,page_size,setPageData} = useContext(PaginationContext)
    const [orderBatchData,setOrderBatchData] = useState<FIFOQueue<OrderBatchDataModel>>(new FIFOQueue<OrderBatchDataModel>(page_size ?? FIFO_QUEUE_SIZE))
    
    //const activeOrderBatches = useSelector((state:RootState)=>state.orderReducer.companyActiveOrdersBatch)
    useEffect(()=>{
        if(setPage && !first.current){
            setPage!(1)
        }
        first.current = false
    },[watch('from_date_time'),watch('to_date_time')])
    
    //const orderBatch = activeOrderBatches.find((orderBatch)=>orderBatch.id?.toString() === orderBatchID)
    return(
        <LoaderQuery
            loading={false}
            queryKey={['get-order-batch-data',page,page_size,watch('from_date_time'),watch('to_date_time')]}
            queryFn={async()=>await queryFn({id,page,page_size,from:watch('from_date_time'),to:watch('to_date_time')})}
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
            <OrderBatchDataQueryDef.PageSizeChanger>
                <OrderBatchDataProvider orderBatchData={orderBatchData} setOrderBatchData={setOrderBatchData}>
                    {children}
                </OrderBatchDataProvider>
            </OrderBatchDataQueryDef.PageSizeChanger>
        </LoaderQuery>
    )    
}

OrderBatchDataQueryDef.PageSizeChanger = function PageSizeChanger({children}:{children:React.ReactNode }){
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