import { useContext } from "react";
import { GridView } from "../../views/GridView";
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren";
import { PaginationButtonWithContext } from "../Pagination/PaginationRender";
import { PaginationContext } from "../Pagination/PaginationContext";
import { useOrderService } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { OrderType, setOrders } from "../../store/orderSlice";
import { PaginationModel } from "../../models/pagination";
import { AddButton } from "../buttons/AddButton";
import { DrawerProvider } from "../Drawer/DrawerProvider";
import { DrawerContext } from "../Drawer/DrawerContext";
import { DrawerApp } from "../Drawer/Drawer";
import { BlurCard } from "../Cards/BlurCard";
import { OrderBatchCreate } from "../forms/OrderBatchCreate";
import { RootState } from "../../store/store";
import { OrderBatchCard } from "../cards/OrderBatchCard";

export function OrderBatchCompanyActive(){
    const dispatch = useDispatch()
    const activeOrdersBatch = useSelector((state:RootState)=>state.orderReducer.companyActiveOrdersBatch)
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
                console.warn(data.data)
                }}
            onError={(error)=>{
                console.error(error)
            }}
        >
            <div className="w-full @container flex flex-col gap-y-4">
                <PaginationButtonWithContext/>
                <div className="w-full float-right">
                    <DrawerProvider>
                        <DrawerContext.Consumer>
                            {({setOpen})=>(
                                <AddButton 
                                className="float-right"
                                onClick={()=>{
                                    //  creating the new Order Batch form
                                    //  open the Drawer and show the Order Batch form
                                    setOpen(true);
                                }}/>
                            )}
                        </DrawerContext.Consumer>
                        <DrawerApp>
                            <BlurCard className="min-h-full ">
                                <OrderBatchCreate/>     
                            </BlurCard>
                        </DrawerApp>
                    </DrawerProvider>
                </div>
                <GridView className="grid-cols-1 @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3">
                    {
                        activeOrdersBatch.map((orderBatch)=>{
                            return <OrderBatchCard orderBatch={orderBatch}/>
                        })
                    }
                </GridView>
            </div>
        </LoaderQuery>
    )
}