//!!! START USING ALWAYS REACT COMPOUND COMPONENTS

import { Avatar, Button, Tooltip } from "@mui/material"
import { OrderModel, STATUS_INDEX } from "../../models/Order"
import { BlurCard } from "./BlurCard"
import { CartProvider } from "../Cart/CartProvider/CartProvider"
import dayjs from "dayjs"
import { CartCard } from "./CartCard"
import { OrderStatusProgressBar } from "../ProgressBar/OrderStatusProgressBar"
import { TextButton } from "../Buttons/TextButtons"
import { OrderProvider } from "../OrderCompany/OrderContext/OrderProvider"
import { useContext, useEffect, useState } from "react"
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
import { notify, notifyCheck } from "../../utlis/notify"
import { AxiosError, AxiosResponse } from "axios"
import { DeleteOrderButton } from "../buttons/DeleteOrderButton"
import { Dropdown } from "../inputs/Dropdown/Dropdown"
import { PaginationProvider } from "../Pagination/PaginationProvider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCompanyService } from "../../services/companyService"
import { PaginationContext } from "../Pagination/PaginationContext"
import { PaginationModel } from "../../models/pagination"
import { usePaginationInfiniteScroll } from "../../hooks/usePaginationInfiniteScroll"
import { CourierProfileModel } from "../../models/Courier"
import { AccountCard } from "./AccountCard"
import { useForm } from "react-hook-form"
import { SearchServer } from "./SearchServer"
import { DeleteButton } from "../Buttons/DeleteButton"
import { DelayForm } from "../forms/DelayForm"
import { AccountAvatar } from "../AccountAvatar/AccountAvatar"
import { StatusCard } from "./StatusCard"
import { twMerge } from "tailwind-merge"

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
                    <div className="flex flex-row gap-x-1 justify-center items-center">
                        <h1 className={`${order.delay_time ? "line-through text-[11px]" : ""}`}>{dayjs(order.delivery_time).format('DD/MM/YYYY HH:mm')}</h1>    
                        {order.delay_time && <h1 className="text-orange-red font-semibold">{dayjs(order.delay_time).format('DD/MM/YYYY HH:mm')}</h1>}
                    </div>
                </div>
            }
        </>
    )
}


OrderCard.DelayTime = function OrderCardDelayTime(){
    const {order} = useContext(OrderContext)
    if (!order || order?.status === 'NOT ACCEPTED' || order?.status === 'CANCELED') return
    return(
        <DialogProvider>
            <DialogContext.Consumer>
                {
                    ({setOpen})=>(
                            <TextButton
                                text="CHOOSE DELAY"
                                onClick={()=>{
                                    setOpen(true)
                                }}
                            />  
                        ) 
                }
            </DialogContext.Consumer>
            <DialogApp>
                <DelayForm/>
            </DialogApp>
        </DialogProvider>
    )
}


OrderCard.ChooseCourier = function OrderCartChooseCourier(){
    const dispatch = useDispatch()
    const {order} = useContext(OrderContext)
    const [open,setOpen] = useState(false)
    const canEditCourier = ()=>{
        const readyIndex = STATUS_INDEX.READY
        if (order && STATUS_INDEX[order.status!] >= readyIndex) return false
        return true
    }
    
    const {register,watch,setValue,getValues} = useForm<{search:string}>({
        disabled:!canEditCourier(),
        defaultValues:{search:order?.courier ? `${order.courier.first_name} ${order.courier.last_name}` : ""}
    })

    // todo: make the search render more smooth
    const {data,ref} = usePaginationInfiniteScroll({
        queryKey:['get-couriers',watch('search')],
        queryFn:({pageParam})=>useCompanyService.getCompanyCouriers({page:pageParam,search:watch('search')}),
    })

    
    if(!order) return 
    return(
        <BlurCard className="w-full flex flex-row gap-x-6 justify-between items-center">
            <Dropdown
                labelName="COURIER"
                name="search"
                open={canEditCourier() ? open : false}
                setOpen={canEditCourier() ? setOpen : ()=>{}}
                register={register('search')}
                defaultValue={getValues('search')}
                onChange={()=>{

                }}
            >
                {data ? data!.pages.map((page)=>{
                    return (page.data as PaginationModel).results.map((profile:CourierProfileModel)=>{
                                return (
                                    <AccountCard profile={profile} className="hover:cursor-pointer" 
                                        onClick={async(event)=>{
                                            event.stopPropagation()
                                            try{
                                                console.log(profile)
                                                const data = await useOrderService.updateOrderCourier({order,courier:profile})
                                                if(data && data.data){
                                                    dispatch(updateOrder({
                                                        order:data.data,
                                                        type:OrderType.COMPANY_ACTIVE
                                                    }))
                                                }
                                                const complete_name = profile.first_name + " " + profile.last_name
                                                setValue('search',complete_name)
                                            }catch(e){
                                                console.log(e)
                                                notifyCheck(e)
                                            }                                            
                                        }}
                                    />
                                )
                            }) 
                }) : null}
                <div ref={ref} className="py-1"></div>
            </Dropdown>
            { canEditCourier() && 
                <DeleteButton
                    className="ml-auto"
                    onClick={async()=>{
                        try{
                            const data = await useOrderService.updateOrderCourier({order})
                            dispatch(updateOrder({
                                order:data.data,
                                type:OrderType.COMPANY_ACTIVE
                            }))
                        }catch(e){
                            console.log(e)
                        }
                    }}
                />
            }
        </BlurCard>
    )
}

// OrderCard.SearchCourier = function OrderCardSearchCourier(){
//     return ( 
//         <div className="p-10 bg-slate-900">
//             <BlurCard className="w-[500px] flex flex-col gap-4 ">
//                 <SearchServer
//                     queryKey={['get-couriers']}
//                     queryFn={useCompanyService.getCompanyCouriers}
//                 />
//             </BlurCard>
//         </div>
//     )
// }

// OrderCard.ChooseCourierDialog = function OrderCardChooseCourierDialog(){
//     const {order} = useContext(OrderContext)

//     if(!order) return 
//     return(
//         <DialogProvider>
//             <DialogContext.Consumer>
//                 {
//                     ({setOpen})=>{
//                         return(
//                             <>
//                                 <TextButton
//                                     text="CHOOSE COURIER"
//                                     onClick={()=>{
//                                         setOpen(true)
//                                     }}
//                                 />
                                
//                             </>
//                         )
//                     }
//                 }
//             </DialogContext.Consumer>
//             <DialogApp>
//                 <OrderCard.SearchCourier/>
//             </DialogApp>
//         </DialogProvider>
//     )
// }

export function OrderShortCard({order,className="",onClick}:{order:OrderModel,className?:string,onClick?:()=>void}){
    return (
        <OrderCard order={order}>
            <div 
                className={"w-full flex flex-row items-center justify-between "+twMerge(className)}
                onClick={onClick}
                >    
                <Avatar
                    alt={`${order.profile?.first_name} ${order.profile?.last_name}`}
                    src={order.profile?.image}
                    sx={{width:"35px",height:"35px"}}
                />
                <h1 className="text-xl italic">#{order.id}</h1>
                <div className="w-28 flex flex-row items-center justify-end">
                    <StatusCard status={order.status!}/>
                </div>
            </div>
        </OrderCard>
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

    const showNextStep = ()=>{
        // show only the next step when the order status is less than the ready state
        /* 
            la company può cambiare tranquillamente lo stato dell'ordine (unidirezionale . Sono in avanti), se l'ordine non è stato spedito. 
            Dopo che è stato preparato l'ordine la company non puoò più far avanzare il suo status ma lo può fare solo il corriere

        */
       
        // ready index is the status index after which the company can't modify the order status
        const readyIndex = STATUS_INDEX.READY
        if (STATUS_INDEX[order.status!] >= readyIndex) return false
        return true
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
                        <OrderCard.DelayTime/>
                        <OrderCard.DeliveryTime/>
                    </div>  
                </div>
            </div>
            {
                //<OrderCard.ChooseCourier/>
            }
            <div className="w-full flex flex-row gap-x-2 mt-auto">
                {
                    showNextStep() &&
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
