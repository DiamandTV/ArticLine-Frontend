import { OrderInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { createContext } from "react";

interface OrderContextInterface{
    order:OrderInterface
}

export const OrderContext = createContext<Partial<OrderContextInterface>>({})