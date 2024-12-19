import { createSlice } from "@reduxjs/toolkit"
import { OrderModel } from "../models/Order"
import { PaginationModel } from "../models/pagination"
interface OrderSliceModel{
    // activeOrders:Array<OrderModel>,
    // notActiveOrders:Array<OrderModel>
    orders:Array<OrderModel>,
    pageCountCategories:Record<string,number> | null,
    pagination:Omit<PaginationModel,'results'> |null
}

const orderSliceInitialValue:OrderSliceModel = {
    orders:[],
}

const orderSlice = createSlice({
    name:"orderSlice",
    initialState:orderSliceInitialValue,
    reducers:{
        setOrders:(state,action)=>{
            state.orders = [...action.payload]
        },
        clearOrders:(state,action)=>{

        },
        addOrder:(state,action)=>{

        },
        removeOrder:(state,action)=>{

        },
        updateOrder:(state,action)=>{
            
        }
    }
})

export const {setOrders} = orderSlice.actions
export const orderReducer = orderSlice.reducer

