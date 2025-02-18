import { FaBatteryEmpty, FaBatteryHalf, FaBatteryQuarter, FaBatteryThreeQuarters } from "react-icons/fa6";
import { DeviceModel } from "../../models/Device"
import { BlurCard } from "./BlurCard"
import { FaBatteryFull } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Button, Tooltip } from "@mui/material";
import { IoIosInformationCircle } from "react-icons/io";

interface DeviceCardProp{
    device:DeviceModel,
    className?:string,
    classNameTitle?:string,
    classNameId?:string,
    size?:number,
    onClick?:()=>void
}
export function DeviceCard({device,onClick,className="",classNameTitle="",classNameId="",size=60}:DeviceCardProp){
    return(
        <BlurCard className={" flex flex-row justify-between items-center py-4 "+twMerge(className) } onClick={onClick}>
            <div>
                <h1 className={"text-2xl "+twMerge(classNameTitle)}>{device.name}</h1>
                <span className={"text-xs italic "+twMerge(classNameId)}>{device.code}</span>
            </div>
            <Battery battery={device.battery} size={size}/>
        </BlurCard>
    )
}


export function Battery({ battery ,size}: { battery: number,size:number }) {
    switch (true) {
        case battery >= 0 && battery <= 5:
            return <FaBatteryEmpty size={size} className="text-red-800" />;
        case battery <= 25:
            return <FaBatteryQuarter size={size} className="text-red-600" />;
        case battery <= 50:
            return <FaBatteryHalf size={size} className="text-orange-500" />;
        case battery <= 75:
            return <FaBatteryThreeQuarters size={size} className="text-yellow-400" />;
        case battery <= 100:
            return <FaBatteryFull size={size} className="text-green-600" />;
        default:
            return (
                <Tooltip title={"BATTERY"} arrow>
                    <Button sx={{m:0.5,p:0,minWidth:"max-content"}}>
                        <IoIosInformationCircle size={40}/>
                    </Button>
                </Tooltip>
            )
            // can't be possible
            return null;
    }
}
