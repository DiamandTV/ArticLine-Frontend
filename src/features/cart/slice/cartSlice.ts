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
        },
        removeCart:(state,action)=>{
            const cartToRemove = action.payload as CartInterface
            state.carts = [...state.carts.filter((cart)=>cart.id !== cartToRemove.id)]
        }
    }
})

export const cartSliceActions = cartSlice.actions
export const cartReducer = cartSlice.reducer