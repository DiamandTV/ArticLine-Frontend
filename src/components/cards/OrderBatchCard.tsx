import { useContext } from "react";
import { ORDER_BATCH_STATUS_INDEX, OrderBatchModel, OrderModel } from "../../models/Order";
import { OrderBatchContext } from "../OrderCompanyBatch/OrderBatchContext/OrderBatchContext";
import { Avatar } from "@mui/material";
import { DeleteOrderButton } from "../buttons/DeleteOrderButton";
import { DeleteButton } from "../Buttons/DeleteButton";
import { OrderCard } from "./OrderCard";
import { OrderBatchProvider } from "../OrderCompanyBatch/OrderBatchContext/OrderBatchProvider";
import { BlurCard } from "./BlurCard";
import { DeviceCard } from "./DeviceCard";
import { Account } from "../../page/App/Account";
import { AccountCard } from "./AccountCard";
import dayjs from "dayjs";
import { StatusCard } from "./StatusCard";
import { StatusProgressBar } from "../ProgressBar/OrderStatusProgressBar";
import { twMerge } from "tailwind-merge";
import { TextButton } from "../Buttons/TextButtons";
import { DrawerProvider } from "../Drawer/DrawerProvider";
import { DrawerContext } from "../Drawer/DrawerContext";
import { DrawerApp } from "../Drawer/Drawer";
import { OrderBatchCreate } from "../forms/OrderBatchCreate";
import { OrderBatchEdit } from "../forms/OrderBatchEdit";

export function OrderBatchCard({orderBatch}:{orderBatch:OrderBatchModel}){
    return(
        <BlurCard className="h-full max-h-full py-2 bg-slate-600 flex flex-col gap-y-6 p-4 px-6">     
            <OrderBatchProvider orderBatch={orderBatch}>
                <OrderBatchCard.TopBar/>
                <div className="w-full flex flex-row gap-x-2">
                    <StatusProgressBar status={orderBatch.status} STATUS={ORDER_BATCH_STATUS_INDEX}/>
                    <div className="w-full flex flex-col justify-between ">
                        <OrderBatchCard.OrderList/>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-x-2">
                    <OrderBatchCard.Device/>
                    <OrderBatchCard.Courier/>
                </div>
                <OrderBatchCard.PickupTime/>
                <OrderBatchCard.EditButton/>      
            </OrderBatchProvider>
        </BlurCard>
    )
}

OrderBatchCard.TopBar = function TopBar(){
    const {orderBatch} = useContext(OrderBatchContext)
    //const complete_name = `${orderBatch!.courier?.first_name} ${orderBatch!.courier?.last_name}`
    return(
        <div className="w-full flex flex-row gap-x-4 justify-start items-center">
            <h1 className="text-lg">{orderBatch?.title}</h1>
            <div className="ml-auto flex flex-row gap-x-2 h-14 justify-center items-center">
                <span className="ml-auto">#{orderBatch!.id}</span>
                <DeleteButton
                    onClick={()=>{

                    }}
                />
            </div>

        </div>
    )
}

OrderBatchCard.OrderList = function OrderList({className=""}:{className?:string}){
    const {orderBatch} = useContext(OrderBatchContext)
    return (
        <BlurCard className={twMerge(`bg-white rounded-xl sticky top-0 w-full max-h-full ${className}`)}>
            <div className="w-full flex flex-col my-4 border-2 border-slate-400 rounded-xl p-2 max-h-96 overflow-y-scroll scrollbar-hide ">
                {orderBatch?.orders ? orderBatch.orders!.map((order)=>{
                    return (
                        <OrderBatchCard.OrderListItem order={order}/>
                    )
                }) : null}
            </div>
        </BlurCard>
    )
}

OrderBatchCard.OrderListItem = function OrderListItem({order}:{order:OrderModel}){
    return(
        <div className="w-full flex flex-col justify-between items-center border-b-2 py-0 last:border-b-0 border-slate-400 gap-y-2 cursor-pointer">
            <div 
                
                className="w-full flex flex-row justify-between items-center px-2">
                <span className="font-mono">#{order.id}</span>
                <div className="w-full flex flex-col justify-center items-center px-4">
                    
                    {
                        //<span className="block text-[18px] font-medium ">{().name}</span>
                        //<p style={{display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical"}} className="text-center text-sm font-thin text-ellipsis overflow-clip whitespace-normal">{order.}</p>
                    }
                    <StatusCard status={order.status!}/>
                </div>
                <span>{order.total_price}$</span>
            </div>
        </div>
    )
}

OrderBatchCard.Courier = function Courier(){
    const {orderBatch} = useContext(OrderBatchContext)
    return(
        orderBatch?.courier ?
            <BlurCard className="py-0 px-0 flex justify-center "> 
                <AccountCard 
                    profile={orderBatch?.courier}
                    className="py-2 px-6"
                    />
            </BlurCard>
        : null
    )
}


OrderBatchCard.Device = function Device(){
    const {orderBatch} = useContext(OrderBatchContext)
    return (
        orderBatch?.device ? 
            <DeviceCard
                device={orderBatch?.device}
                className="py-2 px-6"
                classNameTitle="text-xl"
                classNameId="text-sm"
                size={40}
            /> 
        : null
    )
}

OrderBatchCard.PickupTime = function PickupTime(){
    const {orderBatch} = useContext(OrderBatchContext)
    if(!orderBatch?.pickup_time) return null
    return(
        <div className="w-full flex flex-row justify-between items-center">
            <h1>PICK UP</h1>
            <h1>{dayjs(orderBatch!.pickup_time).format('DD/MM/YYYY hh:mm')}</h1>
        </div>
    )
}

OrderBatchCard.EditButton = function EditButton(){
    return(
        <DrawerProvider>
            <DrawerContext.Consumer>
                {
                    ({setOpen})=>{
                        return (
                            <TextButton 
                                text="EDIT THE BATCH"
                                onClick={()=>{
                                    setOpen(true)
                                }}
                            />
                        )
                    }
                }
            </DrawerContext.Consumer>
            <DrawerApp>
                <BlurCard className="min-h-full ">
                    <OrderBatchEdit/>     
                </BlurCard>
            </DrawerApp>
        </DrawerProvider>
    )
}