import { useGetOrderListQuery } from "@features/order/hooks/useGetOrderListQuery/useGetListOrderQuery"

export function OrderListPage(){
    const {data,isLoading,isSuccess} = useGetOrderListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div>
            {
                data.map((order)=>{
                    return(
                        <div>{order.id}</div>
                    )
                })
            }
        </div>
    )
}