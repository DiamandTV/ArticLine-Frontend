import { useEffect, useState } from "react"
import { Dropdown } from "./Dropdown"
import { DropdownItem } from "./DropdownItems"
import { FixedSizeList } from "react-window"
import { v4 as uuidv4 } from 'uuid';
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";

export interface FixedSizeDropdownProps{
    labelName:string,
    name:string,
    list:Array<Record<string,unknown>> | Array<string>,
    showFunction:(item:unknown,index:number)=>string, // the function which will return the label of the list item
    setValue?:(value:string)=>void,                    
    filterFunction:(e:React.ChangeEvent<HTMLInputElement>)=>unknown,       // the filter function which will be used for filtering the list
    defaultValue?:string,
    register?:UseFormRegisterReturn,
    error?:FieldError|undefined,
    onItemClick?:(item:unknown)=>void,
    closeOnClick?:boolean,
}
export function FixedSizeDropdown({labelName,name,list,filterFunction,showFunction,setValue,onItemClick,defaultValue,register,error,closeOnClick=true,/*filterOnClick=true*/}:FixedSizeDropdownProps){
    
    useEffect(()=>{
        setFilteredList(list)
    },[list])
    const [filteredList,setFilteredList] = useState(list)  
    // the state of the dropdown. true => if it's open , false => if it's closed 
    const [open,setOpen] = useState(false)  
    return (
        <Dropdown
            labelName={labelName}
            name={name}
            register={register}
            open={open}
            setOpen={setOpen}
            defaultValue={defaultValue}
            error={error}
            onChange={(e)=>
                    setFilteredList(filterFunction(e) as Array<Record<string,unknown>>)}
        >
            {
                filteredList.length > 0 ? 
                <FixedSizeList
                className="scrollbar-hide"
                innerElementType={'div'}
                itemCount={filteredList.length}
                height={filteredList.length > (128 / 40) ? 128 : (40*filteredList.length)}
                width={'100%'}
                itemSize={40}
                >
                {({index,style})=>{
                    return (
                        <DropdownItem
                            key={uuidv4()}
                            style={style}
                            title={showFunction(filteredList[index],index)}
                            onClick={()=>{
                                if(closeOnClick) setOpen(false)
                                if(setValue) setValue(showFunction(filteredList[index],index))
                                if(onItemClick != null) onItemClick(filteredList[index])
                                }}
                        />
                    )
                }}
            </FixedSizeList> : <div></div>
            }
        </Dropdown>
    )    
}