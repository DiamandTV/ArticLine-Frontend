import { createSlice } from "@reduxjs/toolkit"
import { OrderModel } from "../models/Order"

export enum OrderType{
    NORMAL,
    COMPANY_ACTIVE,
    COMPANY_NO_ACTIVE
}

const targetMapping:Record<OrderType,keyof OrderSliceModel> = {
    [OrderType.NORMAL]: "orders",
    [OrderType.COMPANY_ACTIVE]: "companyActiveOrders",
    [OrderType.COMPANY_NO_ACTIVE]: "companyNoActiveOrders",
};
interface OrderSliceModel{
    // activeOrders:Array<OrderModel>,
    // notActiveOrders:Array<OrderModel>
    orders:Array<OrderModel>,
    companyActiveOrders:Array<OrderModel>        // company orders
    companyNoActiveOrders:Array<OrderModel>
    // pageCountCategories:Record<string,number> | null,
    // pagination:Omit<PaginationModel,'results'> |null
}


const orderSliceInitialValue:OrderSliceModel = {
    orders:[],
    companyActiveOrders:[], // orders for the company
    companyNoActiveOrders:[]
}


const orderSlice = createSlice({
    name:"orderSlice",
    initialState:orderSliceInitialValue,
    reducers:{
        setOrders:(state,action)=>{
            const {orders,type} = action.payload
            const target = targetMapping[type as OrderType]
            if(target){
                state[target] = [...orders]
            }
            // switch (type as OrderType){
            //     case OrderType.NORMAL:
            //         state.orders = [...orders]
            //         break
            //     case OrderType.COMPANY_ACTIVE:
            //         state.companyActiveOrders = [...orders]
            //         break
            //     case OrderType.COMPANY_NO_ACTIVE:
            //         state.companyNoActiveOrders = [...orders]
            //         break
            // }   
            
        },
        clearOrders:(state,action)=>{
           
        },
        addOrder:(state,action)=>{
            const {order,type} = action.payload
            const target = targetMapping[type as OrderType]
            if(target){
                state[target] = [...state[target],order]
            }
            // switch (type as OrderType){
            //     case OrderType.NORMAL:
            //         state.orders = [...state.orders,order]
            //         break
            //     case OrderType.COMPANY_ACTIVE:
            //         state.companyActiveOrders = [...state.companyActiveOrders,order]
            //         break
            //     case OrderType.COMPANY_NO_ACTIVE:
            //         state.companyNoActiveOrders =  [...state.companyNoActiveOrders,order]
            //         break
            // }
        },
        removeOrder:(state,action)=>{
            const {order,type} = action.payload
            const target = targetMapping[type as OrderType]
            if(target){
                state[target] = [...state[target].filter((_order)=>_order.id!==order.id)]
            }
        },
        updateOrder:(state,action)=>{
            const {order,type} = action.payload
            const target = targetMapping[type as OrderType]
            if(target){
                state[target] = [...state[target].map((_order)=>{
                    if(_order.id===order.id){
                        return order
                    }
                    return _order
                })]
            }
        },
    }
})

export const {setOrders,addOrder,updateOrder,removeOrder} = orderSlice.actions
export const orderReducer = orderSlice.reducer

