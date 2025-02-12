import { useContext } from "react"
import { OrderBatchDataContext } from "../OrderBatchData/OrderBatchDataContext/OrderBatchDataContext"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import dayjs from "dayjs"

export function BatteryGraph(){
    const {orderBatchData} = useContext(OrderBatchDataContext)
        return(
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart width={500} height={300} data={orderBatchData.queue}>
                    <XAxis  dataKey={"created_at"} tickFormatter={(tick)=>dayjs(tick).format("DD/MM/YYYY HH:mm")}/>
                    <YAxis min={0} max={100}/>
                    <Tooltip/>
                                  
                    <Line type="monotone" dataKey={"battery"} stroke={"#FF5722"} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>           
        )
}