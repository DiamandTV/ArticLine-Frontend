import { FaStore } from "react-icons/fa6";

import { MdBatchPrediction } from "react-icons/md";

export function StoreOrderBatchIcon({size}:{size:number}){
    return(
        <div className="w-full relative">
            <FaStore size={size}/>
            <MdBatchPrediction size={size/1.5} className="absolute bottom-0 right-0"/>
        </div>
    )
}
