import { createSlice } from "@reduxjs/toolkit";
import { StoreModel } from "../models/store";

interface HomeSliceMode{
    stores:Array<StoreModel>
}

const homeSliceInitialValue:HomeSliceMode = {
    stores:[]
}

const homeSlice = createSlice({
    name:'home',
    initialState:homeSliceInitialValue,
    reducers:{
        setHomeStores:(state,action)=>{
            state.stores = [...action.payload]
        }
    }
})

export const {setHomeStores} = homeSlice.actions
export const homeReducer = homeSlice.reducer