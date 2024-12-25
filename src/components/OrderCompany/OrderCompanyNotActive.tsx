import { useContext } from "react"
import { useDispatch } from "react-redux"
import { PaginationContext } from "../Pagination/PaginationContext"
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren"
import { useOrderService } from "../../services/orderService"
import { OrderType, setOrders } from "../../store/orderSlice"
import { OrderCompanyList } from "./OrderList/OrderCompanyList"
import { BlurCard } from "../Cards/BlurCard"
import { PaginationModel } from "../../models/pagination"

export function OrderCompanyNoActive(){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    //const companyNoActive = useSelector((state:RootState)=>state.orderReducer.companyNoActiveOrders)
    return(
        <LoaderQuery 
            queryKey={['company-no-active-orders',page]}
            queryFn={async ()=>await useOrderService.getInActiveCompanyOrders({page})}
            onSuccess={(data)=>{
                console.log(data)
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setOrders({
                    orders:data.data.results,
                    type:OrderType.COMPANY_NO_ACTIVE
                }))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }}
            onError={()=>{

            }}
        >   
            <BlurCard className="w-full @container flex flex-col gap-y-4">
                <OrderCompanyList/>
            </BlurCard>
        </LoaderQuery>
    )
}