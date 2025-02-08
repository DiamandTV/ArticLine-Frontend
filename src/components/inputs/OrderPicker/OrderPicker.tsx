import { useState } from "react"
import { Dropdown, DropdownProps } from "../Dropdown/Dropdown"
import { useFormContext } from "react-hook-form"
import { usePaginationInfiniteScroll } from "../../../hooks/usePaginationInfiniteScroll"
import { useOrderService } from "../../../services/orderService"
import { OrderModel } from "../../../models/Order"
import { OrderShortCard } from "../../cards/OrderCard"
import { PaginationModel } from "../../../models/pagination"
import { ChipsContainer } from "../../container/ChipsContainer"
import { TagCard } from "../../Cards/TagCard"
import { DeleteButton } from "../../Buttons/DeleteButton"
import { RiDragMoveLine } from "react-icons/ri";
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
        queryFn:async(pageParam)=>useOrderService.getActiveCompanyOrders({
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
    const {watch} = useFormContext()
    const orders = watch(`${props.name}.ids`) as Array<number> || null
    return(
        <>
            <ChipsContainer
                title="ORDERS"
                className="h-full"
                
            >   <div className="w-full grid grid-cols-2 justify-between items-center"> 
                    {orders ? orders.map((orderId)=>{
                        return(
                            <OrderPickerInput.OrderSortableItem orderId={orderId} {...props}/>
                        )
                    }) : null}
                </div>
            </ChipsContainer>
        </>
    )
}

type OrderSortableItemProps = Omit<DropdownProps,'children'|'open'|'setOpen'> & {orderId:number}

OrderPickerInput.OrderSortableItem = function OrderSortableItem(props:OrderSortableItemProps){
    const {setValue,getValues} = useFormContext()
    return(
        <div className="w-full flex flex-row h-12 bg-slate-900 p-2 rounded-xl">
            <div className="w-full flex flex-row  items-center justify-start gap-x-2" >
                <span className="text-xs font-extralight">ORDER</span>
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
                >
                    <RiDragMoveLine  color="white"/>
                </div>
        
            </div>
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