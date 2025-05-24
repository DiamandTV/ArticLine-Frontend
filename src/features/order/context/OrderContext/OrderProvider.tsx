import { OrderInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { OrderContext } from "./OrderContext";
import { useContext } from "react";

interface OrderProviderProps{
    order:OrderInterface,
    children:React.ReactNode
}

export function OrderProvider({order,children}:OrderProviderProps){
    return(
        <OrderContext.Provider value={{order}}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrderContext(){
    const context = useContext(OrderContext)
    if(context){
        return {...context,order:context.order!}
    }
    throw new Error("useOrderContext can only be used within the OrderProvider component")
}