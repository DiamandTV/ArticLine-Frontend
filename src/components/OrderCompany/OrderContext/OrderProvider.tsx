import { OrderModel } from "../../../models/Order";
import { OrderContext } from "./OrderContext";

interface OrderProviderProps{
    order:OrderModel,
    children:React.ReactNode
}

export function OrderProvider({order,children}:OrderProviderProps){
    return(
        <OrderContext.Provider value={{order}}>
            {children}
        </OrderContext.Provider>
    )
}