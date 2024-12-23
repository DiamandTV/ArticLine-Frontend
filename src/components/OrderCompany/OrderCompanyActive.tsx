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
export function OrderCompanyActive(){
    const dispatch = useDispatch()
    const {page} = useContext(PaginationContext)
    
    const companyActiveOrders = useSelector((state:RootState)=>state.orderReducer.companyActiveOrders)
    return(
        <LoaderQuery 
            queryKey={['company-active-orders']}
            queryFn={async ()=>await useOrderService.getActiveCompanyOrders({page})}
            onSuccess={(data)=>{
                console.log(data)
                dispatch(setOrders({
                    orders:data.data.results,
                    type:OrderType.COMPANY_ACTIVE
                }))
            }}
            onError={()=>{

            }}
        >   
            <div className="w-full @container flex flex-col gap-y-4">
                <GridView className="grid-cols-1 @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3">
                    {companyActiveOrders.map((order)=>{
                        return <OrderCompleteCard order={order} key={uuidv4()}/>
                    })}
                </GridView>
            </div>
        </LoaderQuery>
    )
}