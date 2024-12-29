import { FaBatteryEmpty, FaBatteryHalf, FaBatteryQuarter, FaBatteryThreeQuarters } from "react-icons/fa6";
import { DeviceModel } from "../../models/Device"
import { BlurCard } from "./BlurCard"
import { FaBatteryFull } from "react-icons/fa";

interface DeviceCardProp{
    device:DeviceModel
}
export function DeviceCard({device}:DeviceCardProp){
    return(
        <BlurCard className="flex flex-row justify-between item py-4">

            <div>
                <h1 className="text-2xl ">{device.name}</h1>
                <span className="text-xs italic">{device.code}</span>
            </div>
            <Battery battery={device.battery}/>
        </BlurCard>
    )
}

export function Battery({ battery }: { battery: number }) {
    switch (true) {
        case battery >= 0 && battery <= 5:
            return <FaBatteryEmpty size={60} className="text-red-800" />;
        case battery <= 25:
            return <FaBatteryQuarter size={60} className="text-red-600" />;
        case battery <= 50:
            return <FaBatteryHalf size={60} className="text-orange-500" />;
        case battery <= 75:
            return <FaBatteryThreeQuarters size={60} className="text-yellow-400" />;
        case battery <= 100:
            return <FaBatteryFull size={60} className="text-green-600" />;
        default:
            // can't be possible
            return null;
    }
}
