import { useContext } from "react";
import { GridView } from "../../views/GridView";
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren";
import { PaginationButtonWithContext } from "../Pagination/PaginationRender";
import { PaginationContext } from "../Pagination/PaginationContext";
import { useOrderService } from "../../services/orderService";
import { useDispatch } from "react-redux";
import { OrderType, setOrders } from "../../store/orderSlice";
import { PaginationModel } from "../../models/pagination";
import { AddButton } from "../buttons/AddButton";

export function OrderBatchCompanyActive(){
    const dispatch = useDispatch()
    const {page,setPageData} = useContext(PaginationContext)
    return (
        <LoaderQuery
            queryKey={['company-active-order-batch',page]}
            queryFn={async()=>await useOrderService.getActiveCompanyOrdersBatch({page})}
            onSuccess={(data)=>{
                const paginationData = {...data.data} as  PaginationModel
                dispatch(setOrders({
                    orders:data.data.results,
                    type:OrderType.COMPANY_ACTIVE_BATCH
                }))
                delete paginationData.results
                if(paginationData && setPageData) setPageData(paginationData)
            }}
            onError={(error)=>{
                console.error(error)
            }}
        >
            <div className="w-full @container flex flex-col gap-y-4">
                <PaginationButtonWithContext/>
                <div className="w-full float-right">
                    <AddButton 
                        className="float-right"
                        onClick={()=>{
                            //  creating the new Order Batch form
                            //  open the Drawer and show the Order Batch form
                    }}/>
                </div>
                <GridView className="grid-cols-1 @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3">
                    <div></div>
                </GridView>
            </div>
        </LoaderQuery>
    )
}