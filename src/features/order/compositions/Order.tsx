import { useOrderContext } from "../context/OrderContext/OrderProvider"
import { ACTIVE_ORDER_STATUS_STEPS, COMPANY_ORDER_STATUS_STEPS, OrderStatusType } from "../models/Order/Interface/OrderInterface"
import { PaddingView } from "@views/PaddingView"
import { Accordion, Button, Card, Spinner } from "react-bootstrap"
import { OnlyCartDetailCard } from "@features/cart/components/cards/CartCard"
import { useCartContext } from "@features/cart/context/CartContext/CartProvider"
import { GoLocation } from "react-icons/go"
import { EntityAddressProvider } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider"
import { EntityAddressCard } from "@features/autentication/components/cards/EntityAddressCard/EntityAddressCard"
import { IoAdd, IoAlertCircleOutline, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { LuClockAlert } from "react-icons/lu";
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { useMutation } from "react-query"
import { orderBusinessCacheKey } from "../data/query"
import { orderBusinessService } from "../services/orderBusinessServices"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { OrderForm } from "../components/forms/Order/OrderForm"
import { ModalProviderFn } from "@context/Modal/ModalProviderFn"

export const Order = ()=>null

Order.Status = function Status(){
    const {order} = useOrderContext()
    return(
        <span className="font-medium p-0">
            {order.status}
        </span>
    )
}
Order.StatusChip = function StatusChip(attr:React.HTMLAttributes<HTMLElement>) {
    const { order } = useOrderContext();

    const statusColors: Record<OrderStatusType, string> = {
        'NOT ACCEPTED': 'bg-red-400',
        'ACCEPTED': 'bg-blue-500',
        'WORKING ON': 'bg-yellow-500',
        'READY': 'bg-green-600',
        'SENDED': 'bg-indigo-600',
        'DELIVERED': 'bg-emerald-700',
        'CANCELED': 'bg-red-600',
        'REFUSED':  'bg-red-800'
    };

    const bgColor = statusColors[order.status] || 'bg-gray-200';

    return (
        <div {...attr} className={tailwindMerge(`px-2 py-1 rounded-lg text-white text-xs font-semibold ${bgColor}`,attr.className)}>
            <Order.Status />
        </div>
    );
};

Order.DeliveryIcon = function DeliveryIcon(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <div {...attr} className={tailwindMerge("text-xl py-1",attr.className)}>
            <IoCalendarOutline />
        </div>
    )
}

Order.DeliveryTime = function DeliveryTime(attr:React.HTMLAttributes<HTMLElement>) {
    const { order } = useOrderContext();
    const deliveryTime = new Date(order.delivery_time).toLocaleDateString() || 'NOT DECIDED';
    return (
        
            <div {...attr} className={tailwindMerge("text-xs font-light text-surface-a50",attr.className)}>
                <div>
                    {
                    //    <span className="font-medium">Delivery:</span>
                    } 
                     <span >{deliveryTime}</span>
                </div>
            </div>
    );
};

Order.DeliveryTimeDetails = function DeliveryTimeDetails(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <div {...attr} className={tailwindMerge("flex flex-row items-center gap-1",attr.className)}>
            <Order.DeliveryIcon />
            <Order.DeliveryTime/>
        </div>
    )
}

Order.DelayIcon = function DelayIcon(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <div {...attr} className={tailwindMerge("text-xl py-1",attr.className)}>
            <LuClockAlert />
        </div>
    )
}

Order.DelayTime = function DelayTime(attr:React.HTMLAttributes<HTMLElement>){
    const {order} = useOrderContext()
    return(
        <div {...attr} className={tailwindMerge("",attr.className)}>
            {order.delay_time && (
                <span className="text-xs text-orange-500">+{order.delay_time}</span>
            )}
        </div>
    )
}

Order.DelayTimeDetails = function DelayTimeDetails(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <div {...attr} className={tailwindMerge("flex flex-row items-center gap-1",attr.className)}>
            <Order.DelayIcon />
            <Order.DelayTime/>
        </div>
    )
}

Order.Urgent = function Urgent(attr:React.HTMLAttributes<HTMLElement>){
    const { order } = useOrderContext();
    if (!order) return null;

    const isUrgent = order.request_earliest_delivery;
    return(
        isUrgent && (
        <div {...attr} className={tailwindMerge("flex items-center text-orange-red text-xs font-semibold",attr.className)}>
            <IoAlertCircleOutline className="mr-1" /> Urgente
        </div>
        )
    )
}

Order.CreatedAt = function CreatedAt(attr:React.HTMLAttributes<HTMLElement>){
    const {order} = useOrderContext()
    return(
        <div {...attr} className={tailwindMerge("text-xs text-gray-500",attr.className)}>
            Ordine: {new Date(order.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
    )
}

Order.Address = function Address(){
    const {order} = useOrderContext()
    return(
        <span>
            {order.entity_address.address.full_address}
        </span>
    )
}

Order.AddressIcon = function AddressIcon(){
    return( 
        <div>
            <GoLocation className="" size={20} />
        </div>
    )
}

Order.EntityAddress = function EntityAddress(){
    const {order} = useOrderContext()
    console.log(order.entity_address)
    return( 
        <EntityAddressProvider entityAddress={order.entity_address}>
            <EntityAddressCard className="rounded-none border-none p-0"/>
        </EntityAddressProvider>
    )
}

Order.OrderDetails = function OrderDetails(){
    const {cart} = useCartContext()
    return(
        <PaddingView className="w-full">
            <Accordion defaultActiveKey={"1"}  className="w-full">                        
                <Accordion.Item eventKey="0" className="w-full box-border">
                    <Accordion.Header className="w-full box-border">

                        <h1 className="text-sm font-medium">{`ORDER (${cart?.cartItems_count} items)`}</h1>

                    </Accordion.Header>
                
                    <Accordion.Body className="w-full box-border p-0">
                        <OnlyCartDetailCard className="rounded-t-none"/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </PaddingView>
    )
}

Order.DeliveryDetails = function DeliveryDetails(){
    return(
        <PaddingView className="w-full">
            <Accordion defaultActiveKey={"1"}  className="w-full">                        
                <Accordion.Item eventKey="0" className="w-full box-border">
                    <Accordion.Header className="w-full box-border">

                        <h1 className="text-sm font-medium">{`DELIVERY DETAILS`}</h1>

                    </Accordion.Header>
                
                    <Accordion.Body className="w-full box-border p-0">
                        <Card className="w-full flex flex-col justify-start items-start px-2 py-2 rounded-none">
                            <div className="w-full flex flex-row gap-2">
                                <div className="text-xl py-1">
                                    <IoLocationOutline />
                                </div>
                                <Order.EntityAddress />
                            </div>
                            <hr className="w-full my-1 h-0.5"/>
                                <div className="w-full flex flex-row items-center gap-3">
                                <Order.DeliveryIcon/>
                                <Order.DeliveryTime className="text-sm font-medium text-surface-a0"/>
                            </div>

                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </PaddingView>
    )
} 

Order.TrackingDetails = function TrackingDetails(){
    return(
        <PaddingView>
            <Accordion defaultActiveKey={"1"}  className="w-full">                        
                <Accordion.Item eventKey="0" className="w-full box-border">
                    <Accordion.Header className="w-full box-border">

                        <h1 className="text-sm font-medium">{`TRACKING DETAILS`}</h1>

                    </Accordion.Header>
                
                    <Accordion.Body className="w-full box-border p-0">
                        <Card className="w-full flex flex-col justify-start items-start px-2 py-2 rounded-none">
                            <div className="w-full flex flex-row gap-2">
                                <div className="text-xl py-1">
                                    <IoLocationOutline />
                                </div>
                                <Order.EntityAddress />
                            </div>
                            <hr className="w-full my-1 h-0.5"/>
                                <div className="w-full flex flex-row items-center gap-3">
                                <Order.DeliveryIcon/>
                                <Order.DeliveryTime className="text-sm font-medium text-surface-a0"/>
                            </div>

                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </PaddingView>
    )
}

Order.DelayButton = function DelayButton(){
    const {order} = useOrderContext()
    if(ACTIVE_ORDER_STATUS_STEPS.indexOf(order.status) >= ACTIVE_ORDER_STATUS_STEPS.indexOf('READY')) return null
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button
                                variant="link"
                                onClick={() => setOpen(true)}
                                className="flex flex-row items-center justify-center text-nowrap text-sm font-medium "
                            >
                                <IoAdd size={17.5}/> 
                                <span>DELAY</span>
                            </Button>
                            <Order.DelayDialog/>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}

Order.DelayDialog = function DelayDialog(){
    return(
        <SimpleBottomSheetModal detent="content-height"> 
            <PaddingView>
                <OrderForm.UpdateDelayTime/>
            </PaddingView>
        </SimpleBottomSheetModal>
    )
}

Order.AcceptButton = function AcceptButton(){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                                className="w-full text-sm font-medium"
                                onClick={()=>setOpen(true)}
                                >
                                {'ACCEPT'}
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView>
                                    <OrderForm.UpdateDeliveryTimeAndAccept/>
                                </PaddingView>
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}

Order.CancelButton = function CancelButton(){
    const {order} = useOrderContext()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderBusinessCacheKey.cancel],
        mutationFn:async()=>await orderBusinessService.cancel(order.id)
    })
    return(
        <Button 
            variant="outline-primary"
            className="w-full text-sm font-medium" 
            onClick={async()=>{
                await mutateAsync()
            }}
            >
            {isLoading ? <Spinner/> : 'CANCEL'}
        </Button>
    )
}


Order.RefuseButton = function RefuseButton(){
    return(
        <ModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                                variant="outline-primary"
                                className="w-full text-sm font-medium" 
                                onClick={()=>{
                                    setOpen(true)
                                }}
                                >
                                {'REFUSE'}
                            </Button>
                            <OrderForm.Refuse/>
                        </>
                    )
                }
            }
        </ModalProviderFn>
    )
}

Order.NextButton = function NextButton(){
    const {order} = useOrderContext()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderBusinessCacheKey.nextStep],
        mutationFn:async()=>await orderBusinessService.nextStep(order.id)
    })
    const actualOrderIndex = COMPANY_ORDER_STATUS_STEPS.indexOf(order.status)
    const nextStep = COMPANY_ORDER_STATUS_STEPS[actualOrderIndex+1]
    return(
        <Button
            className="w-full text-sm font-medium" 
            onClick={async()=>{
                await mutateAsync()
            }}
        >
            {
                isLoading ? <Spinner/> : `NEXT STEP | ${nextStep}`
            }
        </Button>
    )
}

Order.DeliveryBatch = function DeliveryBatch(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <PaddingView {...attr} className={tailwindMerge("",attr.className)}>

            <Accordion defaultActiveKey={"1"}  className="w-full">                        
                <Accordion.Item eventKey="0" className="w-full box-border">
                    <Accordion.Header className="w-full box-border">

                        <h1 className="text-sm font-medium">{`DELIVERY BATCH`}</h1>

                    </Accordion.Header>
                
                    <Accordion.Body className="w-full box-border p-0">
                        <Card className="w-full flex flex-col justify-start items-start px-2 py-2 rounded-none">
                            <div className="w-full flex flex-row gap-2">
                                <div className="text-xl py-1">
                                    <IoLocationOutline />
                                </div>
                                <Order.EntityAddress />
                            </div>
                            <hr className="w-full my-1 h-0.5"/>
                                <div className="w-full flex flex-row items-center gap-3">
                                <Order.DeliveryIcon/>
                                <Order.DeliveryTime className="text-sm font-medium text-surface-a0"/>
                            </div>

                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </PaddingView>
    )
}