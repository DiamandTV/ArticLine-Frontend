import { createSlice } from "@reduxjs/toolkit";
import { CartInterface } from "../model/Cart/Interface/CartInterface";

interface CartSliceInterface{
    carts:Array<CartInterface>
}

const cartSliceIntialState:CartSliceInterface= {
    carts:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState:cartSliceIntialState,
    reducers:{
        setCarts:(state,action)=>{
            state.carts = action.payload
        },
        clearCarts:(state)=>{
            state.carts = []
        }
    }
})

export const cartSliceActions = cartSlice.actions
export const cartReducer = cartSlice.reducer