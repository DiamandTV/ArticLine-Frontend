import { useContext } from "react"
import { useDispatch } from "react-redux"
import { PaginationContext } from "../Pagination/PaginationContext"
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren"
import { BlurCard } from "../Cards/BlurCard"
import { useOrderService } from "../../services/orderService"
import { OrderType, setOrders } from "../../store/orderSlice"
import { PaginationModel } from "../../models/pagination"
import { OrderBatchList } from "./OrderList/OrderBatchList"

export function OrderBatchCompanyNoActive(){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    return (
        <LoaderQuery
            queryKey={['company-no-active-orders-batch',page]}
            queryFn={async()=>await useOrderService.getInActiveCompanyOrdersBatch({page})}
            onSuccess={(data)=>{
                console.log(data)
                const paginationData = {...data.data} as  PaginationModel
                if(data.data){
                    dispatch(setOrders({
                        type:OrderType.COMPANY_NO_ACTIVE_BATCH,
                        orders:paginationData.results
                    }))
                    delete paginationData.results
                    if(paginationData && setPageData) setPageData(paginationData)
                }
            }}
            onError={()=>{

            }}
        >
            <BlurCard className="w-full @container flex flex-col gap-y-4">
                <OrderBatchList/>
            </BlurCard>
        </LoaderQuery>
    )
}