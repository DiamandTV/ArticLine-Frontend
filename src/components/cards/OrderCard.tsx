//!!! START USING ALWAYS REACT COMPOUND COMPONENTS

import { Avatar, Button, Tooltip } from "@mui/material"
import { OrderModel } from "../../models/Order"
import { BlurCard } from "./BlurCard"
import { CartProvider } from "../Cart/CartProvider/CartProvider"
import dayjs from "dayjs"
import { CartCard } from "./CartCard"
import { OrderStatusProgressBar } from "../ProgressBar/OrderStatusProgressBar"
import { TextButton } from "../Buttons/TextButtons"
import { OrderProvider } from "../OrderCompany/OrderContext/OrderProvider"
import { useContext } from "react"
import { OrderContext } from "../OrderCompany/OrderContext/OrderContext"
import { IoIosInformationCircle } from "react-icons/io";
import { TOOLKIT_EARLY_MESSAGE } from "../../constraints"
import { DialogProvider } from "../Dialog/DialogProvider"
import { DialogContext } from "../Dialog/DialogContext"
import { DeliveryForm } from "../forms/DeliveryForm"
import { DialogApp } from "../Dialog/Dialog"
import { useOrderService } from "../../services/orderService"
import { useDispatch } from "react-redux"
import { OrderType, updateOrder } from "../../store/orderSlice"
import { notify } from "../../utlis/notify"
import { AxiosError } from "axios"
import { DeleteOrderButton } from "../buttons/DeleteOrderButton"

interface OrderCardProps{
    order:OrderModel,
    children:React.ReactNode
}


export function OrderCard({order,children}:OrderCardProps){
    
    return (
       <BlurCard className="h-full max-h-full py-2 bg-slate-600 flex flex-col gap-y-6 p-4 px-6">      
            <OrderProvider order={order}>
                {children}
            </OrderProvider>
       </BlurCard>
    )
}

OrderCard.TopBar = function OrderCardTopBar (){
    const {order} = useContext(OrderContext)
    const complete_name = `${order!.profile?.first_name} ${order!.profile?.last_name}`
    return(
        <div className="w-full flex flex-row gap-x-4 justify-start items-center">
                <Avatar alt={complete_name} src={order!.profile?.image}/>
                <h1 className="text-lg">{complete_name}</h1>
                <div className="ml-auto flex flex-row gap-x-2 h-14 justify-center items-center">
                    <span className="ml-auto">#{order!.id}</span>
                    <DeleteOrderButton
                        order={order!}
                    />
                </div>

            </div>
    )
}

OrderCard.CreatedTime = function OrderCardCreatedTime(){
    const {order} = useContext(OrderContext)
    return(
        <div className="w-full flex flex-row justify-between items-center">
            <h1>CREATED</h1>
            <h1>{dayjs(order!.created_at).format('DD/MM/YYYY hh:mm')}</h1>
        </div>
    )
}
OrderCard.DeliveryTime = function OrderCardDeliveryTime(){
    const {order} = useContext(OrderContext)
    if(!order) return
    return(
        <>
        {
            (order.request_earliest_delivery || order.status === 'NOT ACCEPTED') &&    
                <div className="w-full flex flex-row relative">
                    <DialogProvider>
                        <DialogContext.Consumer>
                            {
                                ({setOpen})=>(
                                        <TextButton
                                            text="CHOOSE TIME"
                                            onClick={()=>{
                                                setOpen(true)
                                            }}
                                        />  
                                    ) 
                            }
                        </DialogContext.Consumer>
                        <DialogApp>
                            <DeliveryForm/>
                        </DialogApp>
                    </DialogProvider>
                    <Tooltip title={TOOLKIT_EARLY_MESSAGE} arrow style={{position:"absolute"}} className="right-0"  sx={{m:0,p:0}}>
                        <Button sx={{m:0.5,p:0,minWidth:"max-content"}}>
                            <IoIosInformationCircle size={20} className="hover:cursor-pointer" color="orangeRed"/>
                        </Button>
                    </Tooltip>
                </div>         
            }
            {order.delivery_time && !order.request_earliest_delivery &&
                <div className="w-full flex flex-row justify-between items-center">
                    <h1>DELIVERY TIME</h1>
                    <h1>{dayjs(order.delivery_time).format('DD/MM/YYYY hh:mm')}</h1>
                </div>
            }
        </>
    )
}


export function OrderCompleteCard({order}:{order:OrderModel}){
    const dispatch = useDispatch()
    const onNext = async()=>{
        try{
            const data = await useOrderService.updateOrderStatus({order})
            dispatch(updateOrder({
                order:data.data as OrderModel,
                type:OrderType.COMPANY_ACTIVE
            }))
        }
        catch(e){
            console.log(e)
            if(e instanceof AxiosError) notify(e.response?.data)
        }
    }
    return(
        <OrderCard order={order}>
            <OrderCard.TopBar/>
            <div className="w-full flex flex-row">
                <OrderStatusProgressBar status={order.status!}/>
                <div className="w-full flex flex-col gap-y-4">
                    <CartProvider 
                        cart={order.cart}
                        classNames={{
                            detailsClassName:"hidden",
                            deleteCartButtonClassName:"hidden"
                        }}
                    >
                        <CartCard className="relative w-full max-h-full max-w-full"/>
                    </CartProvider>

                    {/*DELIVERY CREATED TIME AND DELIVERY TIME*/}
                    <div className="w-full flex flex-col gap-y-2">
                        <OrderCard.CreatedTime/>
                        <OrderCard.DeliveryTime/>
                    </div>  
                </div>
            </div>
            <div className="w-full flex flex-row gap-x-2 mt-auto">
                {
                    order.status != 'CANCELED' &&
                    <TextButton
                        text="NEXT STEP"
                        onClick={async()=>{
                            await onNext()
                        }}
                    />
                }
                {/*
                <DeleteOrderButton
                    order={order!}
                />
                */}
                
            </div>
        </OrderCard>
    )
}