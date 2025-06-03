import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { PaddingView } from "@views/PaddingView"
import { Button, Card } from "react-bootstrap"
import { IoAdd, IoBag } from "react-icons/io5"
import { OrderDeliveryBatchForm } from "../components/OrderDeliveryBatch/OrderDeliveryBatchForm"
import React from "react";
import { IoCalendarOutline, } from "react-icons/io5";
import { LuClockAlert } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useOrderDeliveryBatchContext } from "../context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { OrderDeliveryBatchStatusType } from "../models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface"
import { TbListSearch } from "react-icons/tb";
import { useGetOrderDeliveryBatchOrderListQuery } from "../hooks/useGetOrderDeliveryBatchOrderListQuery/useGetOrderDeliveryBatchOrderListQuery"
import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface"

export const OrderDeliveryBatch = ()=>null

OrderDeliveryBatch.CreateButton = function CreateButton(){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                                className=""
                                onClick={()=>setOpen(true)}
                            >
                                <IoAdd/>
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView>
                                    <OrderDeliveryBatchForm.Create/>    
                                </PaddingView>       
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}


OrderDeliveryBatch.Status = function Status() {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    return <span className="p-0 font-medium">{orderDeliveryBatch.status}</span>;
};
OrderDeliveryBatch.StatusChip = function StatusChip(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();

    const statusColors: Record<OrderDeliveryBatchStatusType, string> = {
        'PENDING': 'bg-yellow-400',
        'PICKED UP': 'bg-blue-500',
        'IN PROGRESS': 'bg-indigo-600',
        'COMPLETED': 'bg-green-600',
    };

    const bgColor = statusColors[orderDeliveryBatch.status] || 'bg-gray-200';

    return (
        <div {...attr} className={tailwindMerge(`px-2 py-1 rounded-lg text-white text-xs font-semibold ${bgColor}`, attr.className)}>
            <OrderDeliveryBatch.Status />
        </div>
    );
};

OrderDeliveryBatch.PickupIcon = function PickupIcon(attr: React.HTMLAttributes<HTMLElement>) {
    return (
        <div {...attr} className={tailwindMerge("text-xl py-1", attr.className)}>
            <IoCalendarOutline />
        </div>
    );
};

OrderDeliveryBatch.PickupTime = function PickupTime(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    const time = orderDeliveryBatch.pickup_time
        ? new Date(orderDeliveryBatch.pickup_time).toLocaleString()
        : 'NOT DECIDED';

    return (
        <div {...attr} className={tailwindMerge("text-xs font-light text-surface-a50", attr.className)}>
            <span>{time}</span>
        </div>
    );
};

OrderDeliveryBatch.PickupTimeDetails = function PickupTimeDetails(attr: React.HTMLAttributes<HTMLElement>) {
    return (
        <div {...attr} className={tailwindMerge("flex flex-row items-center gap-1", attr.className)}>
            <OrderDeliveryBatch.PickupIcon />
            <OrderDeliveryBatch.PickupTime />
        </div>
    );
};

OrderDeliveryBatch.PickupDelay = function PickupDelay(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    const delay =
        orderDeliveryBatch.pickedup_time && orderDeliveryBatch.pickup_time
            ? new Date(orderDeliveryBatch.pickedup_time).getTime() - new Date(orderDeliveryBatch.pickup_time).getTime()
            : 0;

    const delayMinutes = Math.floor(delay / 60000);

    return (
        <div {...attr} className={tailwindMerge("", attr.className)}>
            {delayMinutes > 0 && (
                <span className="text-xs text-orange-500">+{delayMinutes} min</span>
            )}
        </div>
    );
};

OrderDeliveryBatch.PickupDelayDetails = function PickupDelayDetails(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    const delay =
        orderDeliveryBatch.pickedup_time && orderDeliveryBatch.pickup_time
            ? new Date(orderDeliveryBatch.pickedup_time).getTime() - new Date(orderDeliveryBatch.pickup_time).getTime()
            : 0;
    return (
        <div {...attr} className={tailwindMerge("flex flex-row items-center gap-1", attr.className)}>
            {delay ? <LuClockAlert className="py-1 text-xl" /> : null}
            <OrderDeliveryBatch.PickupDelay />
        </div>
    );
};

OrderDeliveryBatch.Urgent = function Urgent(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    const isUrgent = orderDeliveryBatch.status === 'PENDING' && !!orderDeliveryBatch.pickup_time;

    return (
        isUrgent && (
            <div {...attr} className={tailwindMerge("flex items-center text-orange-red text-xs font-semibold", attr.className)}>
                <IoAlertCircleOutline className="mr-1" />
                Urgente
            </div>
        )
    );
};

OrderDeliveryBatch.CreatedAt = function CreatedAt(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();
    const time = orderDeliveryBatch.pickup_time
        ? new Date(orderDeliveryBatch.pickup_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : '';

    return (
        <div {...attr} className={tailwindMerge("text-xs text-gray-500", attr.className)}>
            Batch creato: {time}
        </div>
    );
};

OrderDeliveryBatch.BatchNumber = function BatchNumber(attr: React.HTMLAttributes<HTMLElement>) {
    const { orderDeliveryBatch } = useOrderDeliveryBatchContext();

    return (
        <div {...attr} className={tailwindMerge("text-xs text-gray-500", attr.className)}>
            Batch #{orderDeliveryBatch.id}
        </div>
    );
};



OrderDeliveryBatch.OrdersListCount = function OrdersListCount(attr:React.HTMLAttributes<HTMLElement>){
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    return(
        <span {...attr} className={tailwindMerge("",attr.className)}>{orderDeliveryBatch.orders_count}</span>
    )
}   

OrderDeliveryBatch.OrdersListCountDetail = function OrdersListCountDetail(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <div {...attr} className={tailwindMerge("flex flex-row-reverse items-center justify-center gap-2 text-base font-medium text-surface-a40",attr.className)}>
            <IoBag/>
            <OrderDeliveryBatch.OrdersListCount/>
        </div>
    )
}

OrderDeliveryBatch.OrderList = function OrderList(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button {...attr} 
                                className={tailwindMerge("text-xl p-1",attr.className)}
                                onClick={()=>setOpen(true)}
                                >
                                
                                <TbListSearch/>
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView>
                                    <div className="md:w-[400px] flex flex-col items-center justify-center w-full gap-2">
                                        <OrderDeliveryBatch.OrderPagination/>
                                        <OrderDeliveryBatchForm.OrderList/>
                                    </div>
                                </PaddingView>
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}
import { RxCross1 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query"
import { orderDeliveryBatchCacheKey } from "../data/query"
import { orderDeliveryBatchServices } from "../services/orderDeliveyBatchServices"
import { OrderProvider, useOrderContext } from "@features/order/context/OrderContext/OrderProvider"
import { useSearchParams } from "react-router"
OrderDeliveryBatch.OrderPaginationCard = function OrderPaginationCard(){
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const {order} = useOrderContext()
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderDeliveryBatchCacheKey.removeOrder],
        mutationFn:async(orderId:number)=>await orderDeliveryBatchServices.removeOrder(orderDeliveryBatch.id,orderId),
        onSuccess:async (data)=>{
            console.log(data)
            await queryClient.invalidateQueries([orderDeliveryBatchCacheKey.listOrders,orderDeliveryBatch.id])
            await queryClient.refetchQueries([orderDeliveryBatchCacheKey.listOrders,orderDeliveryBatch.id])

            await queryClient.invalidateQueries([orderDeliveryBatchCacheKey.list,...searchParams])
            await queryClient.refetchQueries([orderDeliveryBatchCacheKey.list,...searchParams])
            
        },
        onError:(error)=>{
            console.log(error)
        }
    
    })
    const onClick = async()=>{
        if(!isLoading){
            await mutateAsync(order.id)
        }
    }
    return(
        <Card className="flex flex-row items-center justify-center w-full w-max ">
            <h1 className="px-2 py-0.5">
                {`${order.cart.store.title} #${order.id}`}
            </h1>
            <Card.Footer className="px-1.5">
                <RxCross1 className="text-xl" onClick={onClick}/>
            </Card.Footer>
        </Card>
    )
}

OrderDeliveryBatch.OrderPagination = function OrderPagination(){
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const {data,isLoading,isSuccess} = useGetOrderDeliveryBatchOrderListQuery({orderDeliveryBatchId:orderDeliveryBatch.id})
    if(isLoading || !isSuccess) return 
    return (
        <Card className="flex flex-row w-full gap-2 p-2">
            { 
                data.map((order:OrderBusinessInterface)=>{
                    return(
                        <OrderProvider key={order.id} order={order} >
                            <OrderDeliveryBatch.OrderPaginationCard />
                        </OrderProvider>
                    )
                })
            }
        </Card>
    )
}