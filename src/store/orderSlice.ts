import { createSlice } from "@reduxjs/toolkit"
import { OrderModel } from "../models/Order"
interface OrderSliceModel{
    activeOrders:Array<OrderModel>,
    notActiveOrders:Array<OrderModel>
}

const orderSliceInitialValue:OrderSliceModel = {
    activeOrders:[],
    notActiveOrders:[]
}

const orderSlice = createSlice({
    name:"orderSlice",
    initialState:orderSliceInitialValue,
    reducers:{
        setOrders:(state,action)=>{

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

