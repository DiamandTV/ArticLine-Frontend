import { useContext } from 'react'
import {LineChart,Line,ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts'
import { OrderBatchDataContext } from '../OrderBatchData/OrderBatchDataContext/OrderBatchDataContext'
import dayjs from 'dayjs'

export function TemperatureGraph(){
    const {orderBatchData} = useContext(OrderBatchDataContext)
    return(
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <LineChart width={500} height={300} data={orderBatchData}>
                <XAxis  dataKey={"created_at"} tickFormatter={(tick)=>dayjs(tick).format("DD/MM/YY")}/>
                <YAxis min={-40} max={40}/>
                <Tooltip/>
                <Line type="monotone" dataKey={"temperature"} stroke='#22d3ee'  strokeWidth={2} dot={false}/>
            </LineChart>
        </ResponsiveContainer>           
    )
}



