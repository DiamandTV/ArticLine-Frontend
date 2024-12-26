import {  FaClipboardUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
export function CourierUserIcon({size}:{size:number}){
    return(
        <div className=" relative" style={{width:size+size/3+"px",height:size+size/5+"px"}}>
            <FaUser size={size} />
            <FaClipboardUser size={size/1.5} className="absolute bottom-0 right-0" />
        </div>
    )
}