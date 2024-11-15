import { useState } from "react"
import { Dropdown } from "./Dropdown"
import { DropdownItem } from "./DropdownItems"
import { FixedSizeList } from "react-window"
import { v4 as uuidv4 } from 'uuid';
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";
export interface FixedSizeDropdownProps{
    labelName:string,
    name:string,
    list:Array<Record<string,string>>,
    showFunction:(item:unknown)=>string,
    filterFunction:()=>[],
    register:UseFormRegisterReturn,
    error:FieldError

}
export function FixedSizeDropdown({labelName,name,list,filterFunction,showFunction,register}:FixedSizeDropdownProps){
    const [filteredList,setFilteredList] = useState(list)    
    return (
        <Dropdown
            labelName={labelName}
            name={name}
            register={register}
        >
            {
                list.length > 0 ? 
                <FixedSizeList
                className="scrollbar-hide"
                innerElementType={'div'}
                itemCount={list.length}
                height={list.length > (128 / 40) ? 128 : (40*list.length)}
                width={'100%'}
                itemSize={40}
                >
                {({index,style})=>{
                    return (
                        <DropdownItem
                            key={uuidv4()}
                            style={style}
                            title={showFunction(filteredList[index])}
                            onClick={
                                ()=>{setFilteredList(filterFunction())}
                            }
                        />
                    )
                }}
            </FixedSizeList> : <div></div>
            }
        </Dropdown>
    )    
}