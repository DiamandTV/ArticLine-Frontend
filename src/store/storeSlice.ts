import { createSlice } from "@reduxjs/toolkit";
import { StoreModel } from "../models/store";

export interface StoreDetailsModel{
    store:StoreModel | null
}

const storeIntialValues:StoreDetailsModel = {
    store:null
}

const storeSlice = createSlice({
    name:"store-details",
    initialState:storeIntialValues,
    reducers:{
        setStoreDetails:(state,action)=>{
            state.store = action.payload
        }
    }
})

export const {setStoreDetails} = storeSlice.actions
export const storeReducer = storeSlice.reducer