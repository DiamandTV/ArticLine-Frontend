import { LightBlurCard } from "../cards/LightBlurCard";
import { HumidityGraph } from "../graphs/HumidityGraph";
import { TemperatureGraph } from "../graphs/TemperatureGraph";

export function OrderBatchData(){
    
    return(
        <div className="w-full h-full grid grid-cols-1 gap-10">
            <LightBlurCard >
                <TemperatureGraph/>
            </LightBlurCard>
            <LightBlurCard >
                <HumidityGraph/>
            </LightBlurCard>
        </div>
    )    
}

/**
 * <BlurCard className=" bg-slate-600 w-full h-full grid grid-cols-2 gap-x-10">
            <TemperatureGraph/>
            <HumidityGraph/>
        </BlurCard>
 */