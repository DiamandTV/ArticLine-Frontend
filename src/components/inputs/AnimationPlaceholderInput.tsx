import { useState } from "react"
import { GoAlertFill } from "react-icons/go";
// Animtaion Placeholder Input Props
export interface AnimationPlaceholderInputProps {
    labelName:string,
    type:string,
    name:string,
    value:string,
    setValue:(name:string,value:string)=>void
}
export function AnimationPlaceholderInput(
        {labelName,type,name,value,setValue}:AnimationPlaceholderInputProps
    ){
        const [focus,setFocus] = useState(false)
        return (
            <div className="flex flex-col relative w-full">
                <label
                    className= {`transition-all duration-100 ease-in-out absolute z-10 bottom-0 px-0 py-2 text-neutral-400 ${focus ? 'translate-y-[-80%] translate-x-2 text-sm ' : 'translate-y-0 translate-x-0 text-lg'}`} 
                    htmlFor={name}>
                    {labelName.toUpperCase()}
                </label>
                <input 
                    className="focus:outline-none focus:border-blue-200 h-10 w-full border-b-2 bg-transparent px-2"
                    id={name}
                    type={type} 
                    name={name} 
                    onChange={(event)=>setValue(name,event.target.value)}
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>setFocus(value == '' ? false : true)}  
                />
                <GoAlertFill size={22.5} color="#FF4500" className="absolute right-2 top-2  " />
            </div>
        )
}