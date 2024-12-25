import { FaPlus, FaStore } from "react-icons/fa6";

export function StoreCreateIcon({size}:{size:number}){
    return(
        <div className="w-full relative">
            <FaStore size={size}/>
            <FaPlus size={size/1.5} className="absolute bottom-0 right-0"/>
        </div>
    )
}