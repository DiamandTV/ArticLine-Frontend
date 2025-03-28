import { useState } from "react"
import { useParams } from "react-router-dom"
import { OrderModel } from "../../../models/Order"
import { LoaderQuery } from "../../loader/LoaderWithQueryAndChildren"
import { useOrderService } from "../../../services/orderService"
import { OrderProvider } from "../../OrderCompany/OrderContext/OrderProvider"

export function OrderSingleQuery({children,orderId}:{children:React.ReactNode,orderBatchId?:string|number}){
    const params = useParams()
    const [order,setOrder] = useState<OrderModel|null>(null)
    if(!orderId){
        orderId = params['order-id']
    }
    if(!orderId) return
    
    return(
        <LoaderQuery
            queryKey={['get-order-detail',orderId]}
            queryFn={async()=>useOrderService.getOrder({orderId})}
            onSuccess={(data)=>{
                if(data.data){
                    setOrder(data.data)
                }
            }}
            onError={()=>{
                setOrder(null)
            }}  
        >
            {
                order ?
                <OrderProvider order={order!}>
                    {children}
                </OrderProvider>
                : null    
            }
        </LoaderQuery>
    )
}