import { useContext, useState } from "react"
import { Dropdown, DropdownProps } from "../Dropdown/Dropdown"
import { useFormContext } from "react-hook-form"
import { usePaginationInfiniteScroll } from "../../../hooks/usePaginationInfiniteScroll"
import { useOrderService } from "../../../services/orderService"
import { OrderBatchModel, OrderModel } from "../../../models/Order"
import { OrderShortCard } from "../../cards/OrderCard"
import { PaginationModel } from "../../../models/pagination"
import { ChipsContainer } from "../../container/ChipsContainer"
import { TagCard } from "../../Cards/TagCard"
import { DeleteButton } from "../../Buttons/DeleteButton"
import { RiDragMoveLine } from "react-icons/ri";
import { BlurCard } from "../../Cards/BlurCard"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import { useDispatch } from "react-redux"
import { OrderType, updateOrder } from "../../../store/orderSlice"
import { OrderBatchContext } from "../../OrderCompanyBatch/OrderBatchContext/OrderBatchContext"
export function OrderPickerInput(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const [open,setOpen] = useState(false)
    const {register,getValues,formState:{errors}} = useFormContext()
    return (
        <>
            <Dropdown
                {...props}
                
                open={open}
                setOpen={setOpen}
                name={`${props.name}.label`}
                register={register(`${props.name}.label`)}
                error={errors[`${props.name}.label`] }
                defaultValue={getValues(`${props.name}.label`)}
            >
                <OrderPickerInput.DropdownItems {...props}/>
            </Dropdown>
            {
                    <OrderPickerInput.OrdersSortable {...props}/>
            //      <OrderPickerInput.OrdersChipsContainer {...props}/>
            }
        </>
    )
}

OrderPickerInput.DropdownItems = function DropdownItems(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const {watch,setValue,getValues} = useFormContext()
    const {data,ref} = usePaginationInfiniteScroll({
        queryKey:['get-company-orders-batch',watch(`${props.name}.label`),watch(`${props.name}.ids`)],
        queryFn:async(pageParam)=>useOrderService.serachActiveCompanyOrders({
            page:pageParam.pageParam,
            search:watch(`${props.name}.label`),
            added:watch(`${props.name}.ids`)
        })
    })
    
    return(
        <>
            
            {data ? data!.pages.map((page)=>{
                return (page.data as PaginationModel).results.map((res)=>{
                            const order = res as OrderModel
                            
                            return (
                                <OrderShortCard 
                                    order={order}
                                    className="hover:cursor-pointer"
                                    onClick={()=>{
                                        const orderLabel = `#${order.id} - ${order.status}`
                                        setValue(`${props.name}.label`,orderLabel)

                                        const orders = getValues(`${props.name}.ids`)
                                        if(orders){
                                            setValue(`${props.name}.ids`,[...orders ,order.id])
                                        } else {
                                            setValue(`${props.name}.ids`,[order.id])
                                        }
                                    }}
                                />
                            )
                        }) 
            }) : null}
            <div ref={ref} className="py-1"></div>
        </>
    )
}

OrderPickerInput.OrdersSortable = function OrdersSortable(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const dispatch = useDispatch()
    const {orderBatch} = useContext(OrderBatchContext)
    const {watch,setValue} = useFormContext()
    const orders = watch(`${props.name}.ids`) as Array<number> || null
    
    const handleDragEnd = async (event:DragEndEvent) => {
        const {active,over} = event
        if(active != undefined && over != undefined){
            const oldIndex = orders.findIndex((order)=>order.toString()===active.id)
            const newIndex = orders.findIndex((order)=>order.toString()===over.id)
            if (oldIndex !== -1 && newIndex !== -1){
                const newOrderIDList = arrayMove(orders,oldIndex,newIndex)
                
                setValue(`${props.name}.ids`,newOrderIDList)
                try{
                    // fetching the new position of the list
                    await useOrderService.updateOrderSort({id:newOrderIDList[newIndex],order:newIndex})
                    if(orderBatch){
                        const newOrderList = arrayMove(orderBatch!.orders!,oldIndex,newIndex)
                        const updatedOrderBatch:OrderBatchModel = {...orderBatch,orders:newOrderList}
                        dispatch(updateOrder({
                            type:OrderType.COMPANY_ACTIVE_BATCH,
                            order:updatedOrderBatch
                        }))
                    }
                }catch(e){
                    alert("ERROR IN SORTING THE ORDER")
                    console.error("ERROR IN SORTING THE ORDER")
                    console.error(e)
                    
                }
            }
        }
    }   
    return(
        <>
            <ChipsContainer
                title="ORDERS"
                className="h-full"
                
            >   
                <DndContext modifiers={[restrictToParentElement]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={orders.map((id)=>id.toString())}>
                        <div className="w-full grid grid-cols-2 justify-between items-center gap-x-2"> 
                            {orders ? orders.map((orderId)=>{
                                return(
                                    <OrderPickerInput.OrderSortableItem orderId={orderId} {...props}/>
                                )
                            }) : null}
                        </div>
                    </SortableContext>
                </DndContext>
            </ChipsContainer>
        </>
    )
}

type OrderSortableItemProps = Omit<DropdownProps,'children'|'open'|'setOpen'> & {orderId:number}

OrderPickerInput.OrderSortableItem = function OrderSortableItem(props:OrderSortableItemProps){
    const {setValue,getValues} = useFormContext()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.orderId?.toString()});
    
      const style = transform ? {
        transform: CSS.Transform.toString(transform),
        transition, // Opzionale, per rendere il movimento più fluido
    } : undefined;
    return(
        <div 
            ref={setNodeRef}
            style={style}
            >
            <BlurCard  className="h-12  py-2 bg-slate-600 flex flex-row p-2 px-6">
                <div className="w-full flex flex-row  items-center justify-start gap-x-2" >
                    <span className="text-base font-extralight">ORDER</span>
                    <h1 className="italic font-semibold">#{props.orderId}</h1>
                </div>
                <div className="w-full flex flex-row items-center justify-center gap-x-2">
                    <DeleteButton
                        onClick={()=>{
                            const ordersID = getValues(`${props.name}.ids`) as Array<number>
                            setValue(`${props.name}.ids`,ordersID.filter((id)=>id!==props.orderId))
                        }}
                    />
                    <div 
                        className={"max-w-max h-full flex flex-col justify-center items-center px-4 bg-sky-400 rounded-xl hover:cursor-pointer text-2xl "}
                        {...listeners}
                        {...attributes}
                    >
                        <RiDragMoveLine  color="white"/>
                    </div>
            
                </div>
            </BlurCard>
        </div>
    )
}

OrderPickerInput.OrdersChipsContainer = function OrdersChipsContainer(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const {watch,setValue,getValues} = useFormContext()
    const orders = watch(`${props.name}.ids`) as Array<number> || null
    return(
        <>
            <ChipsContainer
                title="ORDERS"
            >
                
                {orders ? orders.map((orderId)=>{
                    const ordersID = getValues(`${props.name}.ids`) as Array<number>
                    return (
                        <TagCard
                            onDeleteClick={()=>{
                                
                                setValue(`${props.name}.ids`,ordersID.filter((id)=>id!==orderId))
                            }}>
                            <span className="text-xs font-extralight">ORDER</span>
                            <h1 className="italic font-semibold">#{orderId}</h1> 
                        </TagCard>
                    )
                }) : null}
            </ChipsContainer>
        </>
    )
}