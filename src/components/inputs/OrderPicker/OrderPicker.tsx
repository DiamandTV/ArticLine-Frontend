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
            <OrderPickerInput.OrdersChipsContainer {...props}/>
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