import { useState } from "react"
//import { useDispatch } from "react-redux"
import { usePaginationInfiniteScroll } from "../../../hooks/usePaginationInfiniteScroll"
import { useFormContext } from "react-hook-form"
import { useCompanyService } from "../../../services/companyService"
import { Dropdown, DropdownProps } from "../Dropdown/Dropdown"
import { AccountCard } from "../../cards/AccountCard"
import { PaginationModel } from "../../../models/pagination"
import { CourierProfileModel } from "../../../models/Courier"
//import { useOrderService } from "../../../services/orderService"

export function CourierInput(props:Omit<DropdownProps,"open"|"setOpen"|"children">){
    //const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const {getValues,register} = useFormContext()

    return(
        <>
            <input hidden {...register(`${props.name}.id`)}/>
            <Dropdown
                {...props}
                name={`${props.name}.label`}
                register={register(`${props.name}.label`)}
                defaultValue={getValues(`${props.name}.label`)}
                open={open}
                setOpen={()=>{
                    if(open){
                        setTimeout(()=>setOpen(false),100)
                    }else{
                        setOpen(true)
                    }
                }}
            >
                <CourierInput.DropDownItem {...props}/>      
            </Dropdown>       
        </>
    )
}

CourierInput.DropDownItem = function DropDownItem(props:Omit<DropdownProps,"open"|"setOpen"|"children">){
    // const canEditCourier = ()=>{
    //     // const readyIndex = STATUS_INDEX.READY
    //     // if (order && STATUS_INDEX[order.status!] >= readyIndex) return false
    //     // return true
    //     return true
    // }
    
    const {watch,setValue} = useFormContext()

    // todo: make the search render more smooth
    const {data,ref} = usePaginationInfiniteScroll({
        queryKey:['get-couriers',watch(`${props.name}.label`)],
        queryFn:({pageParam})=>useCompanyService.getCompanyCouriers({page:pageParam,search:watch(`${props.name}.label`)}),
    })
    return (
        <>
        {data ? data!.pages.map((page)=>{
                return (page.data as PaginationModel).results.map((profile)=>{
                            const courier = profile as CourierProfileModel
                            return (
                                <AccountCard profile={courier} className="hover:cursor-pointer" 
                                    onClick={async(event)=>{
                                        event.stopPropagation()
                                        // setValue(props.name,{
                                        //     id:courier.id,
                                        //     label:courier.first_name + " " + courier.last_name
                                        // })                   
                                        setValue(`${props.name}.id`,courier.id)
                                        setValue(`${props.name}.label`,courier.first_name + " " + courier.last_name)    
                                        
                                    }}
                                />
                            )
                        }) 
            }) : null}
            <div ref={ref} className="py-1"></div>
        </>
    )
}