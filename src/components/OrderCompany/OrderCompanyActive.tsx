import { useContext } from "react";
import { useOrderService } from "../../services/orderService";
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren";
import { PaginationContext } from "../Pagination/PaginationContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { OrderCompleteCard } from "../cards/OrderCard";
import { OrderType, setOrders } from "../../store/orderSlice";
import { v4 as uuidv4 } from 'uuid';
import { GridView } from "../../views/GridView";
import { PaginationButtonWithContext } from "../Pagination/PaginationRender";
import { PaginationModel } from "../../models/pagination";
export function OrderCompanyActive(){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    
    const companyActiveOrders = useSelector((state:RootState)=>state.orderReducer.companyActiveOrders)
    return(
        <LoaderQuery 
            queryKey={['company-active-orders',page]}
            queryFn={async ()=>await useOrderService.getActiveCompanyOrders({page})}
            onSuccess={(data)=>{
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setOrders({
                    orders:data.data.results,
                    type:OrderType.COMPANY_ACTIVE
                }))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }}
            onError={()=>{

            }}
        >   
            <div className="w-full @container flex flex-col gap-y-4">
                <PaginationButtonWithContext/>
                <GridView className="grid-cols-1 @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3">
                    {companyActiveOrders.map((order)=>{
                        return <OrderCompleteCard order={order} key={uuidv4()}/>
                    })}
                </GridView>
            </div>
        </LoaderQuery>
    )
}