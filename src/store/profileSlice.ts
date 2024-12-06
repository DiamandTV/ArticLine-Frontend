import { createSlice } from "@reduxjs/toolkit";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";
import { StoreModel } from "../models/store";

export interface ProfileSliceModel{
    profile:UserProfileModel | CompanyProfileModel | null,
    stores:Array<StoreModel>,
}

const profileInitalState:ProfileSliceModel = {
    profile:null,
    stores:[]
}

const profileSlice = createSlice({
    name:'profile',
    initialState:profileInitalState,
    reducers:{
        setProfile:(state,action)=>{
            state.profile = action.payload.profile
        },
        addStore:(state,action)=>{
            state.stores = [...state.stores,action.payload]
        }
    }
})

export const { setProfile,addStore } = profileSlice.actions
export const profileReducer = profileSlice.reducer