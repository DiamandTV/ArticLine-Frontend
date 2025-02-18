import { useContext } from 'react'
import {LineChart,Line,ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts'
import { OrderBatchDataContext } from '../OrderBatchData/OrderBatchDataContext/OrderBatchDataContext'
import dayjs from 'dayjs'
export function HumidityGraph(){
    const {orderBatchData} = useContext(OrderBatchDataContext)
    return(
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <LineChart width={500} height={500} data={orderBatchData.queue}>
                <XAxis  dataKey={"created_at"} tickFormatter={(tick)=>dayjs(tick).format("DD/MM/YYYY")}/>
                <YAxis min={0} max={100}/>
                <Tooltip/>          
                <Line type="monotone" dataKey={"humidity"} stroke={"#FF5722"} strokeWidth={2} dot={false}/>
            </LineChart>
        </ResponsiveContainer>           
    )
}



