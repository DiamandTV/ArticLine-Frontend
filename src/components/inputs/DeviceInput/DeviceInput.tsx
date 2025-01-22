import { useFormContext } from "react-hook-form";
import { usePaginationInfiniteScroll } from "../../../hooks/usePaginationInfiniteScroll";
import { Dropdown, DropdownProps } from "../Dropdown/Dropdown";
import { useCompanyService } from "../../../services/companyService";
import { PaginationModel } from "../../../models/pagination";
import { DeviceModel } from "../../../models/Device";
import { DeviceCard } from "../../cards/DeviceCard";
import { useState } from "react";

export function DeviceInput(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const [open,setOpen] = useState(false)
    const {register,getValues,formState:{errors}} = useFormContext()

    return(
        <>
            <input hidden={true} />
            <Dropdown
                {...props}
                open={open}
                setOpen={setOpen}
                name={`${props.name}.label`}
                register={register(`${props.name}.label`)}
                error={errors[`${props.name}.label`] }
                defaultValue={getValues(`${props.name}.label`)}
            >
                <DeviceInput.DropdownItem {...props}/>      
            </Dropdown>
        </>
    )
}

DeviceInput.DropdownItem = function DropdownItem(props:Omit<DropdownProps,'children'|'open'|'setOpen'>){
    const {watch,setValue} = useFormContext()
    const {data,ref} = usePaginationInfiniteScroll({
        queryKey:['get-company-device',watch(`${props.name}.label`)],
        queryFn:({pageParam})=>useCompanyService.geCompanyDevices({page:pageParam,search:watch(`${props.name}.label`)})
    })
    return(
        <>
            {
                data ? data!.pages.map((page)=>{
                    return (page.data as PaginationModel).results.map((res)=>{
                        const device = res as DeviceModel
                        return (
                            <>
                                <DeviceCard 
                                    device={device as DeviceModel} 
                                    className="rounded-none text-sm py-2 px-4 bg-slate-800 bg-opacity-100 backdrop-blur-lg hover:bg-slate-900 hover:cursor-pointer" 
                                    classNameTitle="text-lg"
                                    classNameId="text-xs font-thin"
                                    size={40}
                                    onClick={()=>{
                                        setValue(`${props.name}.id`,device.id)
                                        setValue(`${props.name}.label`,device.code)
                                        
                                    }}
                                />
                            </>    
                        )
                    })
                }) : null
            }
            <div ref={ref} className="py-0.5 bg-transparent"></div>
        </>
    )
}