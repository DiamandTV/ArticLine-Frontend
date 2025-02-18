import { LightBlurCard } from "../cards/LightBlurCard";
import { HumidityGraph } from "../graphs/HumidityGraph";
import { TemperatureGraph } from "../graphs/TemperatureGraph";

export function OrderBatchData(){
    
    return(
        <div className="w-full grid grid-cols-1 gap-5">
            {
                ([<TemperatureGraph/>,<HumidityGraph/>]).map((graph,index)=>(
                    <LightBlurCard 
                        key={index}
                        className="px-2 lg:px-8 h-[400px]" >
                        {graph}
                    </LightBlurCard>
                ))
            }
        </div>
    )    
}

/**
 * <BlurCard className=" bg-slate-600 w-full h-full grid grid-cols-2 gap-x-10">
            <TemperatureGraph/>
            <HumidityGraph/>
        </BlurCard>
 */