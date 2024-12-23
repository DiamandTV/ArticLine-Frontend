import { createContext } from "react";
import { OrderModel } from "../../../models/Order";

interface OrderContextModel{
    order:OrderModel|null
}

export const OrderContext = createContext<OrderContextModel>({
    order:null
})