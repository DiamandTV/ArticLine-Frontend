import { FaMinus, FaPlus } from "react-icons/fa6";
import { MAX_COUNTER_VALUE } from "../../../constraints";
import { twMerge } from 'tailwind-merge'
interface CounterProps{
    counter:number,
    setCounter:(count:number)=>void,
    minCount?:number,
    maxCount?:number,
    iconSize?:number
    className?:string
}

export function Counter({counter,setCounter,minCount=1,maxCount=MAX_COUNTER_VALUE,iconSize=25,className=""}:CounterProps){
    return (
        <div className={twMerge(`w-full h-full flex flex-row justify-center items-center gap-x-16 text-white text-3xl ${className}`)}>
            <div 
                className="p-1 border-2 border-sky-400 rounded-full hover:cursor-pointer"
                onClick={()=>{
                    if(counter > minCount) setCounter(counter-1)
                }}
                >
                <FaMinus size={iconSize} color="rgb(56 189 248)" />
            </div>
            <h1 className=" font-bold font-mono">{counter}</h1>
            <div 
                className="p-1  rounded-full order-2 border-2 border-sky-400 hover:cursor-pointer"
                onClick={()=>{
                    if(counter < maxCount) setCounter(counter + 1)
                }}
                >
                <FaPlus size={iconSize} color="rgb(56 189 248)"/>
            </div>

        </div>
    )
}