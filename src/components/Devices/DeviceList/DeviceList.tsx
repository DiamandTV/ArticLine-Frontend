import { useSelector } from "react-redux";
import { GridView } from "../../../views/GridView";
import { RootState } from "../../../store/store";
import { DeviceCard } from "../../cards/DeviceCard";

export function DeviceList(){
    const devices = useSelector((state:RootState)=>state.profileReduce.devices)
    return(
        <GridView className="">
            {devices.map((device)=>{
                return(
                    <DeviceCard device={device}/>
                )
            })}
        </GridView>
    )
}